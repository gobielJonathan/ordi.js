export function isPromise(promise) {
  return !!promise && typeof promise.then === 'function';
}
