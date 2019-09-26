import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
import http from "../services/httpService";

require("@babel/polyfill");
require("dotenv").config();

const apiKey = process.env.apiKey;
const apiKeyParam = `?api_key=${apiKey}`;

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  api.use(
    "/facets",
    facets({
      config,
      db
    })
  );

  // perhaps expose some API metadata at the root
  api.get("/", async (req, res) => {
    res.send("Welcome to the backend application!");
  });

  // get summoner
  api.get("/summoner/:name", async (req, res) => {
    const name = req.params.name;
    if (name) {
      try {
        const response = await http.get(
          `/summoner/v4/summoners/by-name/${name}${apiKeyParam}`
        );
        console.log(response.data);
        res.send(response.data);
      } catch (error) {
        console.error(error);
        // {"status":{"message":"Data not found - summoner not found","status_code":404}}
        res.send(error.response.data);
      }
    }
  });

  return api;
};
