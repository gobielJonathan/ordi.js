export const removeURLParameter = (url = "") => {
  try {
    const { pathname } = new URL(
      url,
      process.env.HOST_SERVER ?? "http://localhost:5000/"
    );
    return pathname;
  } catch {
    return "";
  }
};
