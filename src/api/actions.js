import http from "../services/httpService";
import _ from "lodash";

require("@babel/polyfill");
require("dotenv").config();

const apiKey = process.env.apiKey;
const apiKeyParam = `?api_key=${apiKey}`;

function defaultAction() {}

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
export default function getResource(
  router,
  route,
  foreignResourceUri,
  onSuccess = defaultAction,
  onFailure = defaultAction
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
