const ifDev = (_true: unknown, _false: unknown) => {
  if (process.env.NODE_ENV === "development") {
    if (_true instanceof Function) {
      return _true();
    }
    return _true;
  }
  return _false;
};

export default ifDev;
