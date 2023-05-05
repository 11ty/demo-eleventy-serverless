const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const fs = require("fs");

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = function(eleventyConfig) {
	// Render on first-request
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "serverless",
		functionsDir: "./netlify/functions/",
		redirects: "netlify-toml-builders",
	});

	// Fully dynamic template for comparison
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "dynamic",
		functionsDir: "./netlify/functions/",
		redirects: "netlify-toml-functions",
	});

	// testing
	eleventyConfig.addFilter("dateDebug", inputPath => {
		return fs.statSync(inputPath);
	})

	return {
		dir: {
			input: "src"
		}
	};
};
