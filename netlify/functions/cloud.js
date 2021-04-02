const path = require("path");
const fs = require("fs");
const Eleventy = require("@11ty/eleventy");
// const debug = require("debug");

function getRootDir() {
  let paths = [
    // /var/task/src/netlify/functions/cloud/src/
    path.join(process.cwd(), `src/netlify/functions/cloud/`), // netlify function
    path.join(process.cwd(), `netlify/functions/cloud/`), // on netlify dev
  ];

  for(let path of paths) {
    if(fs.existsSync(path)) {
      return path;
    }
  }

  throw new Error(`No path found in ${paths}`);
}

function getOutputUrl(lambdaPath) {
  let defaultPath = "/.netlify/functions/cloud";
  if(lambdaPath.startsWith(defaultPath)) {
    return lambdaPath.substr(defaultPath.length);
  }
  return "/";
}

async function getEleventyOutput(rootDir, lambdaPath, queryParams) {
  let inputDir = path.join(rootDir, "src");
  let contentMap = require(path.join(rootDir, "map.json"));
  let contentKey = queryParams.url || getOutputUrl(lambdaPath);
  // debug.enable("Eleventy*");

  // find inputPath from map.json and output url
  let inputPath = contentMap[contentKey];
  if(!inputPath) {
    throw new Error(`Output URL not found for ${contentKey} in ${JSON.stringify(contentMap)}`);
  }

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
    let rootDir = getRootDir();

    return {
      statusCode: 200,
      headers: {
        "content-type": "text/html; charset=UTF-8"
      },
      body: await getEleventyOutput(rootDir, event.path, event.queryStringParameters),
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
