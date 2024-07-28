export const removeURLParameter = (url = "") => {
  try {
    const { pathname } = new URL(url, "http://localhost:5000/");
    return pathname;
  } catch {
    return "";
  }
};
