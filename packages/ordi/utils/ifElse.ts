import ifFunc from "./ifFunc";

const ifElse = (_true: boolean) => (trueVal: unknown, falseVal?: unknown) => {
  if (_true) {
    return ifFunc(trueVal);
  }

  return ifFunc(falseVal);
};

export default ifElse;
