const ifProd = (_true: unknown, _false?: unknown) => {
  if (process.env.NODE_ENV === "production") {
    if (_true instanceof Function) {
      return _true();
    }
    return _true;
  }
  return _false;
};

export default ifProd;
