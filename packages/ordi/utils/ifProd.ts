import ifFunc from "./ifFunc";

const ifProd = (_true: unknown, _false?: unknown) => {
  if (process.env.NODE_ENV === "production") {
    return ifFunc(_true);
  }

  return ifFunc(_false);
};

export default ifProd;
