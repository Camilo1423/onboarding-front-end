import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import Params from "../configs/params.json" assert { type: "json" };
import Routes from "../configs/routes.json" assert { type: "json" };
import Config from "../constant/config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseRute = resolve(__dirname, "..");

const tmpObject = { ...Config };

tmpObject.Routes = Routes.Routes;
tmpObject.Params = Params.Params;

const newConfig = JSON.stringify(tmpObject);
fs.writeFileSync(`${baseRute}/constant/config.json`, newConfig);
