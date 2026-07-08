export const serverWarmState = {
  searchIndex: false,
};

export function isFullyWarmed(): boolean {
  return serverWarmState.searchIndex;
}
