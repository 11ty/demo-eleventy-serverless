const path = require("path");
const fs = require("fs");
const Eleventy = require("@11ty/eleventy");
// const debug = require("debug");

function getInputDir() {
  let paths = [
    // "/var/task/src/netlify/functions/cloud/"
    path.join(process.cwd(), `src/netlify/functions/cloud/`), // process.cwd == "/var/task" on aws
    path.join(process.cwd(), `netlify/functions/cloud/src/`), // on netlify dev
  ];

  for(let path of paths) {
    if(fs.existsSync(path)) {
      return path;
    }
  }

  throw new Error(`No path found in ${paths}`);
}

async function getEleventyOutput(inputDir, queryParams) {
  // debug.enable("Eleventy*");

  let inputPath = path.join(inputDir, queryParams.path);
  console.log( inputPath );
  let elev = new Eleventy(inputPath, null, {
    config: function(eleventyConfig) {
      // Map the query param to Global Data
      eleventyConfig.addGlobalData("query", queryParams);
    }
  });
  elev.setInputDir(inputDir);
  await elev.init();

  let json = await elev.toJSON();
  if(!json.length) {
    throw new Error("Couldn’t find any generated output from Eleventy.");
  }

  for(let entry of json) {
    if(entry.inputPath === inputPath) {
      console.log( "Content found", inputPath );
      return entry.content;
    }
  }

  console.log( json );
  throw new Error(`Couldn’t find any matching output from Eleventy for ${inputPath}`);
}

exports.handler = async (event, context) => {
  try {
    let inputDir = getInputDir();
    console.log( ">>>FOUND", inputDir );
    return {
      statusCode: 200,
      headers: {
        "content-type": "text/html; charset=UTF-8"
      },
      body: await getEleventyOutput(inputDir, event.queryStringParameters),
      isBase64Encoded: false
    }
  } catch (error) {
    console.log("Error", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }
}
