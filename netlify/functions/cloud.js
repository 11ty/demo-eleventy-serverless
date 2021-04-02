const path = require("path");
const fs = require("fs");
const Eleventy = require("@11ty/eleventy");
// const debug = require("debug");

const DEMO_INPUT_DIR = "./src/";

function changeProjectDir() {
  let filenameNoExtension = path.basename(__filename, path.extname(__filename));
  let awsPath = `"/var/task/src/netlify/functions/${filenameNoExtension}/`;

  if(fs.existsSync(awsPath)) {
    process.chdir(awsPath);
  } else {
    console.log( ">>>> NO DIR FOUND" );
  }
}

async function getEleventyOutput(inputDir, queryParams) {
  // debug.enable("Eleventy*");

  let inputPath = "./" + path.join(inputDir, queryParams.path);
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
    changeProjectDir();

    console.log( event.path, process.cwd() );

    return {
      statusCode: 200,
      headers: {
        "content-type": "text/html; charset=UTF-8"
      },
      body: await getEleventyOutput(DEMO_INPUT_DIR, event.queryStringParameters),
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
