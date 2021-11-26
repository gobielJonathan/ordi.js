export function normalizeAssets(assets) {
  if (isObject(assets)) {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
}
