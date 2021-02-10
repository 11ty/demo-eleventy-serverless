const Eleventy = require("@11ty/eleventy");
const fs = require("fs");

// Based on https://github.com/DavidWells/netlify-functions-workshop/blob/master/lessons-code-complete/use-cases/13-returning-dynamic-images/functions/return-image.js
exports.handler = async (event, context) => {
  let {} = event.queryStringParameters;
  let pageContent;

  try {
    process.env.ELEVENTY_CLOUD = process.env.DEPLOY_PRIME_URL || "";
    console.log( "Dir", process.cwd() );
    console.log( "test.njk exists", fs.existsSync("./test.njk") );
    let elev = new Eleventy("./src/netlify/functions/test.njk");
    await elev.init();
    console.log( "Globs", elev.eleventyFiles.getFileGlobs() );
    console.log( "Files", await elev.eleventyFiles.getFiles() );

    fs.readdir(process.cwd() + "/src/netlify/functions", function (err, files) {
      if (err) {
        console.log('Unable to scan directory: ' + err);
        return
      } 

      files.forEach(function (file) {
        console.log("File in /src/netlify/functions:", file); 
      });
    });

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
