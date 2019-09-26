import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
import apiActions from "./actions";

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

  apiActions.getResource(
    api,
    "/summoner/:name",
    "/summoner/v4/summoners/by-name/{name}"
  );

  // champion mastery
  // ex FgL6H3nXy2_tJhHGODUgS5stmXU0vPiaaX0EIcnOM8PrTmU/53
  apiActions.getResource(
    api,
    "/champion-mastery/:encryptedSummonerId/:championId",
    "/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}"
  );

  return api;
};
