import path from "path";

const ROOT_PATH = process.cwd();

const resolveCwd = (filePath: string = "") => {
  return path.resolve(ROOT_PATH, "src", filePath);
};

export default resolveCwd;
