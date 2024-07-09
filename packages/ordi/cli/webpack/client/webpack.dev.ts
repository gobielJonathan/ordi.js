import { type Configuration } from "webpack";
import { mergeWithCustomize, customizeObject }  from "webpack-merge"
import ReactRefreshWebpackPlugin  from "@pmmmwh/react-refresh-webpack-plugin"

import common  from "./webpack.config"

export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    plugins: "append",
  }),
})(common, {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [new ReactRefreshWebpackPlugin()],

});
