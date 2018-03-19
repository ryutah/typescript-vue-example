import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import config from "./webpack.base.config.babel";
import merge from "webpack-merge";

export default merge(config, {
  mode: "production",
  plugins: [new UglifyJsPlugin()]
});
