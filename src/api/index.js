import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
import http from "../services/httpService";
import _ from "lodash";

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

  function defaultAction() {}

  getResource(
    api,
    "/summoner/:name",
    "/summoner/v4/summoners/by-name/{name}",
    defaultAction,
    defaultAction
  );

  // champion mastery
  // ex FgL6H3nXy2_tJhHGODUgS5stmXU0vPiaaX0EIcnOM8PrTmU/53
  getResource(
    api,
    "/champion-mastery/:encryptedSummonerId/:championId",
    "/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}",
    defaultAction,
    defaultAction
  );

  function getUrlParams(req, route) {
    let urlParams = _.words(route, /:[a-zA-Z0-9]+/g).map(param =>
      _.replace(param, ":", "")
    );
    return urlParams.map(param => ({ param: param, value: req.params[param] }));
  }

  // given any variation of /lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}
  // replace the {variables} with values
  function createForeignUri(foreignResourceUri, urlParams) {
    let uri = foreignResourceUri;
    for (const p of urlParams) {
      uri = _.replace(uri, `{${p.param}}`, p.value);
    }
    return uri;
  }

  // general get resource abstraction for interfacing with foreign resources
  function getResource(
    router,
    route,
    foreignResourceUri,
    onSuccess,
    onFailure
  ) {
    router.get(route, async (req, res) => {
      const urlParams = getUrlParams(req, route);
      const uri = createForeignUri(foreignResourceUri, urlParams);

      try {
        const response = await http.get(`${uri}${apiKeyParam}`);
        onSuccess();
        res.send(response.data);
      } catch (error) {
        onFailure();
        // {"status":{"message":"Data not found - summoner not found","status_code":404}}
        res.send(error.response.data);
      }
    });
  }

  return api;
};
