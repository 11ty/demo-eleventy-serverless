# Eleventy Cloud Demo

Running Eleventy inside of a Netlify serverless function.

## Run it

## Locally

Requires `netlify-cli` for local testing, run `npm install netlify-cli -g`.

1. Run `npm start`
1. Navigate to the demo URL at `http://localhost:8888/.netlify/functions/cloud?name=ZAAAACH`

## Production

1. [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/demo-eleventy-cloud)

## How it works

1. `./netlify/functions/cloud.js` is the code for running Eleventy in the cloud. This requires Eleventy 1.0 (this demo is currently using a Canary build—careful here, Canary is considered unstable! Don’t use it in production)
1. Currently `cloud.js` compiles and renders `sample-nunjucks.njk` and sets query parameters as Global Data in Eleventy’s cascade. For demo purposes it also uses a few Eleventy features: a Global Data file, an include, and an Eleventy layout.
1. `bundle.sh` automates bundling your build’s code into the serverless function for deployment. This is the `./netlify/functions/cloud/` directory.