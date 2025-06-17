import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import Params from "../configs/params.json" assert { type: "json" };
import Routes from "../configs/routes.json" assert { type: "json" };
import Config from "../constant/config.json" assert { type: "json" };

const args = process.argv.slice(2);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseRute = resolve(__dirname, "..");

const tmpObject = { ...Config };
if (args[0] == "Local") {
  tmpObject.isProd = Params.Encripted.Local;
  tmpObject.Api = Params.Apis.Local;
  tmpObject.Socket = Params.Apis.Local;
}

if (args[0] == "Dev") {
  tmpObject.isProd = Params.Encripted.Dev;
  tmpObject.Api = Params.Apis.Dev;
  tmpObject.Socket = Params.Apis.Dev;
}

if (args[0] == "Prod") {
  tmpObject.isProd = Params.Encripted.Prod;
  tmpObject.Api = Params.Apis.Prod;
  tmpObject.Socket = Params.Apis.Prod;
}

tmpObject.Routes = Routes.Routes;
tmpObject.Params = Params.Params;

const newConfig = JSON.stringify(tmpObject);
fs.writeFileSync(`${baseRute}/constant/config.json`, newConfig);
