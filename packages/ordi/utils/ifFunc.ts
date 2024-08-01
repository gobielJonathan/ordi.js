const ifFunc = (value: unknown) => {
  if (typeof value === "function") {
    return value();
  }
  return value;
};

export default ifFunc;
