import path from "path";

const ROOT_PATH = process.cwd();

const resolveCwd = (_path: string = "") => {
  return path.resolve(ROOT_PATH, _path);
};

export default resolveCwd;
