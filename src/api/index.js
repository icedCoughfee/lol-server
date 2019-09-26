import {
	version
} from "../../package.json";
import {
	Router
} from "express";
import facets from "./facets";

require('dotenv').config();

console.log(process.env.apiKey);

const apiKey = process.env.apiKey;
const apiKeyParam = `?api_key=${apiKey}`;
const region = "na1";
const axios = require("axios").default;
axios.defaults.baseURL = `https://${region}.api.riotgames.com/lol`;

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
			db,
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
				const response = await axios.get(
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