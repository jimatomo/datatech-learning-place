// サーバプロセス内のウォーム状態（コールドスタート対策）
// - 同一サーバインスタンス内で一度ロードできていれば、その後のwarmupは初期化処理をスキップする
// - サーバレス等でプロセスが変わればリセットされる（その場合は再度warmupが走る）
export const serverWarmState = {
  searchClient: false,
  embedding: false,
};

/**
 * ウォームアップが完了しているかどうかを判定する
 * @returns true の場合、searchClient と embedding の両方が初期化済み
 */
export function isFullyWarmed(): boolean {
  return serverWarmState.searchClient && serverWarmState.embedding;
}
