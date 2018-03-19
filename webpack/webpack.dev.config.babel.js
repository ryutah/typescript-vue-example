import config from "./webpack.base.config.babel";
import merge from "webpack-merge";

export default merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    inline: true,
    contentBase: "./dist",
    port: "3000",
    host: "0.0.0.0"
  }
});
