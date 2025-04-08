import * as ConfigDevelopment from "./index.development";
import * as ConfigProduction from "./index.production";
import { Config } from "./type";

const environment = (function () {
  if (process.env.APP_ENV === "production") return "production";
  return "development";
})();

const config: Config = {
  production: ConfigProduction,
  development: ConfigDevelopment,
}[environment].config;

export default config;
