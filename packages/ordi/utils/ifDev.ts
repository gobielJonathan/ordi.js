import ifFunc from "./ifFunc";

const ifDev = (_true: unknown, _false?: unknown) => {
  if (process.env.NODE_ENV === "development") {
    return ifFunc(_true);
  }

  return ifFunc(_false);
};

export default ifDev;
