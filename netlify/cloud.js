const path = require("path");
const Eleventy = require("@11ty/eleventy");
const debug = require("debug");
const fs = require("fs-extra");

// workaround the bundler to hardcode dependencies
const eleventyConfig = require("./.eleventy.js");

const PROJECT_DIR = "/var/task/src/netlify/functions/cloud/";
const INPUT_DIR = `./src/`;
const FILE_MAP = {
  "sample-vue": "./src/sample-vue.vue",
  "sample-nunjucks": "./src/sample-nunjucks.njk",
};

process.env.ELEVENTY_CLOUD = true;
process.env.ELEVENTY_EXPERIMENTAL = true;

async function getPageContent(inputDir, inputPath) {
  let elev = new Eleventy(inputPath);
  elev.setInputDir(inputDir);
  await elev.init();

  let json = await elev.toJSON();
  if(!json.length) {
    throw new Error("Couldn’t find any generated output from Eleventy.");
  }

  for(let entry of json) {
    console.log( entry.inputPath, inputPath );
    if(entry.inputPath === inputPath) {
      console.log( "Content found", inputPath );
      return entry.content;
    }
  }

  console.log( json );
  throw new Error(`Couldn’t find any matching output from Eleventy for ${inputPath}`);
}

exports.handler = async (event, context) => {
  let { slug } = event.queryStringParameters;

  try {
    // Hacky hack to make node_modules from Vue components (in /tmp/.cache/) work properly
    if(!fs.existsSync("/tmp/.cache/vue/node_modules/")) {
      fs.copySync("/var/task/src/node_modules/", "/tmp/.cache/vue/node_modules/");
    }

    process.chdir(PROJECT_DIR);

    let inputPath = FILE_MAP[slug];
    if(!inputPath) {
      throw new Error(`Invalid slug: ${slug}`);
    }

    console.log( "Path: ", inputPath );
    console.log( "Project Dir: ", PROJECT_DIR );
    console.log( "Input Dir: ", INPUT_DIR);

    if(!path.resolve(PROJECT_DIR, inputPath).startsWith(PROJECT_DIR)) {
      throw new Error(`Invalid file path: ${inputPath}`);
    }

    return {
      statusCode: 200,
      headers: {
        "content-type": "text/html; charset=UTF-8"
      },
      body: await getPageContent(INPUT_DIR, inputPath),
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

// For local testing
// (async function() {
//   // let content = await getPageContent("src", "./src/sample-vue.vue");
//   let content = await getPageContent("src", "./src/sample-nunjucks.njk");
//   console.log( content );
// })();
