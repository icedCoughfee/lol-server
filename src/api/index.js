import {
  Router
} from "express";
import facets from "./facets";
import getResource, {
  getChampionMastery
} from "./actions";
import http from "../services/httpService"

export default ({
  config,
  db
}) => {
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


  // should the front end consume this data from this interface or should we call here an export out?
  // seems pretty redundant to do this
  api.get("/hello", async (req, res) => {
    try {
      const response = await http.get("http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json");
      res.send(response.data);

    } catch (e) {
      res.send(e.response.data);
    }
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

  api.get("/champion-mastery/champion-masteries/by-summoner-name/:summonerName", async (req, res) => {
    const {
      summonerName
    } = req.params;
    const response = await getChampionMastery(summonerName);
    try {
      res.send(response.data)
    } catch (e) {
      res.send(e.response.data)
    }
  })

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