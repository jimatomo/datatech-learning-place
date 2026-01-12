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
const getScriptURL = (sw: ServiceWorker | null | undefined) => (sw as any)?.scriptURL as string | undefined

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
 * Safari(PWA) 向けに「SWが使える状態」までを安全に取得する。
 *
 * - `navigator.serviceWorker.ready` は「そのページがSWに制御される」ことを待つため、
 *   Safariでは永遠に解決しない/遅いことがある（特に初回登録直後）。
 * - SW更新が失敗すると installing が `redundant` になり、activated を待つだけだと永久待ちになる。
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

  const throwTimeout = async (registration?: ServiceWorkerRegistration | null) => {
    const diag = formatServiceWorkerDiagnostics(buildDiagnostics(registration))
    throw new Error(`Service Worker の準備がタイムアウトしました (${timeoutMs}ms)\n${diag}`)
  }

  // まずは scope を明示して取得（Safariで getRegistration() の挙動差が出ることがあるため）
  let registration: ServiceWorkerRegistration | null = null
  try {
    registration = await navigator.serviceWorker.getRegistration(scope)
  } catch {
    registration = await navigator.serviceWorker.getRegistration()
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
    const candidate = registration?.installing || registration?.waiting
    if (candidate) {
      await new Promise<void>((resolve, reject) => {
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
      })
    }

    // それでも active が付かない場合は、少し待って再チェック
    while (Date.now() < deadline) {
      if (registration?.active) return registration
      await sleep(200)
      // registration オブジェクトが古い可能性があるので取り直し
      registration = await navigator.serviceWorker.getRegistration(scope)
    }
    await throwTimeout(registration)
    // unreachable
    return registration!
  }

  // update を試みる（Safariで古いSWが残るケースの回避）
  try {
    await registration.update()
  } catch {
    // update未対応/失敗は致命ではないので無視
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

