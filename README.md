# Eleventy Cloud Demo

Running Eleventy inside of a Netlify serverless function.

## Run it

### Locally

Requires `netlify-cli` for local testing, run `npm install netlify-cli -g`.

1. Run `npm start`
1. Navigate to the demo URL at `http://localhost:8888/.netlify/functions/cloud?name=ZAAAACH`

### Production

1. [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/demo-eleventy-cloud)
1. There are no other steps 😅

## How it works

1. Use Eleventy as normal.
    - In this demo `src` is the input directory.
    - For this demo we include one Nunjucks template (`./src/sample-nunjucks.njk`), a Global Data file, an include template, and an Eleventy layout.
1. `./netlify/functions/cloud.js` is the code for running Eleventy in the serverless function.
    - This requires Eleventy 1.0. this demo is currently using a Canary build. Be careful here, Canary is considered unstable! Don’t use it in production.
    - `./netlify/functions/cloud.js` compiles and renders `./src/sample-nunjucks.njk` at request time and sets query parameters as Global Data in Eleventy’s cascade.
1. `bundle.sh` automates bundling your build’s code into the serverless function for deployment. It puts files into your `./netlify/functions/cloud/` directory.