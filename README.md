# Riot Games API basic nodejs interface

This API provides a basic nodejs template to allow users to develop the front-end. This example only provides the basic Riot Games API calls.The interface extends an [ES6 Express boilerplate](https://github.com/developit/express-es6-rest-api).

## Getting Started

```sh
# clone it
git clone git@github.com:icedCoughfee/lol-server.git
cd lol-server

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start

# Deploying to Heroku
Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) or use Heroku website portal.
Store the environment variables under Settings > Reveal configuration variables > apiKey. You must add the environment variable yourself. Set the value to your Riot Games API key, which will be replaced at run-time.

## License

MIT
```
