# Eleventy Cloud Demo

Running Eleventy inside of a Netlify serverless function.

## Run it

### Locally

1. Run `npm start`
1. Navigate to the demo URL at `http://localhost:8080/`

### Production

1. [View the demo on Netlify](https://demo-eleventy-serverless.netlify.app)
1. [Deploy your own to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/demo-eleventy-serverless)

## How it works

_This requires Eleventy 1.0 Canary 29 or newer. Be careful here, Canary is considered unstable! Don’t use it in production._

1. Use Eleventy as normal.
    - In this demo `src` is the input directory.
    - For this demo we include one Nunjucks template (`./src/sample-nunjucks.njk`), a Global Data file, an include template, and an Eleventy layout.
    - To make any template file into a serverless template, modify your `permalink` object to include a `serverless` key.

2. Add the bundler plugin to your Eleventy configuration file (probably `.eleventy.js`). The name property (we use `serverless` in this example) should match the `key` inside of your template’s `permalink` object.

```js
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
        name: "serverless",
        functionsDir: "./netlify/functions/",
    });
};
```

3. `./netlify/functions/serverless/index.js` is the code for running Eleventy in the serverless function.