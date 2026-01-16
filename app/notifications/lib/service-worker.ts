export type ServiceWorkerDiagnostics = {
  href: string
  hasController: boolean
  controllerState?: string
  registration?: {
    scope: string
    activeState?: string
    waitingState?: string
    installingState?: string
    activeScriptURL?: string
    waitingScriptURL?: string
    installingScriptURL?: string
  }
}

const getSWState = (sw: ServiceWorker | null | undefined) => sw?.state
// ServiceWorker#scriptURL は標準プロパティ。Safari向けにも optional chaining で安全に読む
const getScriptURL = (sw: ServiceWorker | null | undefined) => sw?.scriptURL

export const formatServiceWorkerDiagnostics = (d: ServiceWorkerDiagnostics) => {
  const r = d.registration
  return JSON.stringify(
    {
      href: d.href,
      controller: d.hasController ? { state: d.controllerState } : null,
      registration: r
        ? {
            scope: r.scope,
            active: r.activeState ? { state: r.activeState, scriptURL: r.activeScriptURL } : null,
            waiting: r.waitingState ? { state: r.waitingState, scriptURL: r.waitingScriptURL } : null,
            installing: r.installingState ? { state: r.installingState, scriptURL: r.installingScriptURL } : null,
          }
        : null,
    },
    null,
    2
  )
}

const buildDiagnostics = (registration?: ServiceWorkerRegistration | null): ServiceWorkerDiagnostics => {
  const controller = navigator.serviceWorker.controller
  return {
    href: typeof location !== "undefined" ? location.href : "",
    hasController: !!controller,
    controllerState: getSWState(controller ?? undefined),
    registration: registration
      ? {
          scope: registration.scope,
          activeState: getSWState(registration.active),
          waitingState: getSWState(registration.waiting),
          installingState: getSWState(registration.installing),
          activeScriptURL: getScriptURL(registration.active),
          waitingScriptURL: getScriptURL(registration.waiting),
          installingScriptURL: getScriptURL(registration.installing),
        }
      : undefined,
  }
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

/**
 * タイムアウト付きPromiseラッパー
 */
const withTimeout = <T>(promise: Promise<T>, ms: number, label: string): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} がタイムアウトしました (${ms}ms)`)), ms)
    ),
  ])
}

/**
 * Safari(PWA) 向けに「SWが使える状態」までを安全に取得する。
 *
 * - `navigator.serviceWorker.ready` は「そのページがSWに制御される」ことを待つため、
 *   Safariでは永遠に解決しない/遅いことがある（特に初回登録直後）。
 * - SW更新が失敗すると installing が `redundant` になり、activated を待つだけだと永久待ちになる。
 * - Safari PWA では statechange イベントが発火しないケースがあるため、
 *   statechange 待機にもタイムアウトを設定し、ポーリングにフォールバックする。
 *
 * この関数は "PushManager を使える Registration（active もしくは activated まで到達）" を返す。
 */
export async function getUsableServiceWorkerRegistration(opts?: {
  timeoutMs?: number
  swUrl?: string
  scope?: string
}): Promise<ServiceWorkerRegistration> {
  const timeoutMs = opts?.timeoutMs ?? 30000
  const swUrl = opts?.swUrl ?? "/sw.js"
  const scope = opts?.scope ?? "/"

  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker が利用できません")
  }

  const start = Date.now()
  const deadline = start + timeoutMs

  const getRemainingTime = () => Math.max(0, deadline - Date.now())

  const throwTimeout = async (registration?: ServiceWorkerRegistration | null) => {
    const diag = formatServiceWorkerDiagnostics(buildDiagnostics(registration))
    throw new Error(`Service Worker の準備がタイムアウトしました (${timeoutMs}ms)\n${diag}`)
  }

  // まずは scope を明示して取得（Safariで getRegistration() の挙動差が出ることがあるため）
  let registration: ServiceWorkerRegistration | null = null
  try {
    registration = (await navigator.serviceWorker.getRegistration(scope)) ?? null
  } catch {
    registration = (await navigator.serviceWorker.getRegistration()) ?? null
  }

  // 無ければ明示的に登録
  if (!registration) {
    try {
      registration = await navigator.serviceWorker.register(swUrl, {
        scope,
        updateViaCache: "none",
      })
    } catch (e) {
      const diag = formatServiceWorkerDiagnostics(buildDiagnostics(registration))
      const msg = e instanceof Error ? e.message : String(e)
      throw new Error(`Service Worker の登録に失敗しました: ${msg}\n${diag}`)
    }
  }

  // ここから「使える（activeがいる）か」をポーリング＋イベントで待つ
  // Safariでは controller が付くのを待つとハングするので、active を優先して返す。
  const ensureActiveOrActivated = async () => {
    // 既に active があればそれでOK（PushManager利用は controller 必須ではない）
    if (registration?.active) return registration

    // installing/waiting があれば statechange を監視
    // ただし Safari PWA では statechange が発火しないケースがあるため、
    // 短いタイムアウト（最大5秒）を設定してポーリングにフォールバックする
    const candidate = registration?.installing || registration?.waiting
    if (candidate) {
      const stateChangeTimeout = Math.min(5000, getRemainingTime())
      
      try {
        await withTimeout(
          new Promise<void>((resolve, reject) => {
            const onState = () => {
              // activated になったらOK
              if (candidate.state === "activated") {
                cleanup()
                resolve()
                return
              }
              // Safariで更新失敗すると redundant になりうる → ここで明示的に失敗扱いにする
              if (candidate.state === "redundant") {
                cleanup()
                reject(new Error("Service Worker のインストール/更新が失敗しました (state=redundant)"))
              }
            }
            const cleanup = () => {
              candidate.removeEventListener("statechange", onState)
            }
            candidate.addEventListener("statechange", onState)
            // 即時チェック
            onState()
          }),
          stateChangeTimeout,
          "Service Worker statechange 待機"
        )
      } catch (e) {
        // statechange 待機がタイムアウトした場合はポーリングにフォールバック
        // redundant エラーの場合はそのまま再throw
        if (e instanceof Error && e.message.includes("redundant")) {
          throw e
        }
        console.warn("statechange 待機がタイムアウトしました。ポーリングにフォールバックします。")
      }
    }

    // active が付くまでポーリングで待つ
    // Safari PWA では statechange イベントが発火しないことがあるため、
    // ポーリングが主な手段となる
    while (Date.now() < deadline) {
      // registration オブジェクトが古い可能性があるので毎回取り直し
      registration = (await navigator.serviceWorker.getRegistration(scope)) ?? null
      if (registration?.active) return registration
      await sleep(200)
    }
    await throwTimeout(registration)
    // unreachable
    return registration!
  }

  // update を試みる（Safariで古いSWが残るケースの回避）
  // ただし Safari PWA では update() が長時間ブロックすることがあるため、
  // 短いタイムアウトを設定する
  try {
    await withTimeout(
      registration.update(),
      Math.min(3000, getRemainingTime()),
      "Service Worker update"
    )
  } catch {
    // update未対応/失敗/タイムアウトは致命ではないので無視
  }

  try {
    return await ensureActiveOrActivated()
  } catch (e) {
    // 失敗したら診断情報を添えて返す
    const base = e instanceof Error ? e.message : String(e)
    const diag = formatServiceWorkerDiagnostics(buildDiagnostics(registration))
    throw new Error(`${base}\n${diag}`)
  }
}

