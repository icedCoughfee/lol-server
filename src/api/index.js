import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
import getResource from "./actions";

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

  // CHAMPION ROTATIONS
  getResource(
    api,
    "/platform/champion-rotations",
    "/platform/v3/champion-rotations"
  );

  // LEAGUE
  getResource(
    api,
    "/league/challengerleagues/by-queue/:queue",
    "/league/v4/challengerleagues/by-queue/{queue}"
  );

  getResource(
    api,
    "/league/entries/by-summoner/:encryptedSummonerId",
    "/league/v4/entries/by-summoner/{encryptedSummonerId}"
  );

  getResource(
    api,
    "/league/entries/:queue/:tier/:division",
    "/league/v4/entries/{queue}/{tier}/{division}"
  );

  getResource(
    api,
    "/league/grandmasterleagues/by-queue/:queue",
    "/league/v4/grandmasterleagues/by-queue/{queue}"
  );

  getResource(
    api,
    "/league/leagues/:leagueId",
    "/league/v4/leagues/{leagueId}"
  );

  getResource(
    api,
    "/league/masterleagues/by-queue/:queue",
    "/league/v4/masterleagues/by-queue/{queue}"
  );

  // SUMMONER
  getResource(
    api,
    "/summoner/by-account/:encryptedAccountId",
    "/summoner/v4/summoners/by-account/{encryptedAccountId}"
  );

  getResource(
    api,
    "/summoner/by-name/:summonerName",
    "/summoner/v4/summoners/by-name/{summonerName}"
  );

  getResource(
    api,
    "/summoner/by-puuid/:encryptedPUUID",
    "/summoner/v4/summoners/by-puuid/{encryptedPUUID}"
  );

  getResource(
    api,
    "/summoner/by-id/:encryptedSummonerId",
    "/summoner/v4/summoners/{encryptedSummonerId}"
  );

  // SPECTATOR
  getResource(
    api,
    "/spectator/active-games/by-summoner/:encryptedSummonerId",
    "/spectator/v4/active-games/by-summoner/{encryptedSummonerId}"
  );

  getResource(api, "/spectator/featured-games", "/spectator/v4/featured-games");

  // CHAMPION MASTERY
  getResource(
    api,
    "/champion-mastery/champion-masteries/by-summoner/:encryptedSummonerId",
    "/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}"
  );

  getResource(
    api,
    "/champion-mastery/by-summoner/:encryptedSummonerId/by-champion/:championId",
    "/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}"
  );

  getResource(
    api,
    "/champion-mastery/scores/by-summoner/:encryptedSummonerId",
    "/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}"
  );

  return api;
};
