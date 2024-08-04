export default function safeParse<T = unknown>(value: string) {
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    return;
  }
}
