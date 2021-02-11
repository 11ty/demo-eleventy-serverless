const Eleventy = require("@11ty/eleventy");
const fs = require("fs");

// Based on https://github.com/DavidWells/netlify-functions-workshop/blob/master/lessons-code-complete/use-cases/13-returning-dynamic-images/functions/return-image.js
exports.handler = async (event, context) => {
  let {} = event.queryStringParameters;
  let pageContent;

  try {
    process.env.ELEVENTY_CLOUD = process.env.DEPLOY_PRIME_URL || "";
    process.env.ELEVENTY_EXPERIMENTAL = true;
    
    process.chdir("./src/netlify/functions/eleventycloud/");

    let src = "./src/netlify/functions/eleventycloud/view.vue";
    console.log( src, "exists:", fs.existsSync(src) );

    let elev = new Eleventy(src);
    await elev.init();

    let json = await elev.toJSON();
    if(!json.length) {
      throw new Error(`Couldn’t find any generated output from Eleventy: ${JSON.stringify(json)}`);
    }

    pageContent = json[0].content;
  } catch (error) {
    console.log("Error", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }

  return {
    statusCode: 200,
    headers: {
      "content-type": "text/html; charset=UTF-8"
    },
    body: pageContent,
    isBase64Encoded: false
  }
}
