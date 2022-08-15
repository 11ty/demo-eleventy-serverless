const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const fs = require("fs");

module.exports = function(eleventyConfig) {
	// Render on first-request
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "serverless",
		functionsDir: "./netlify/functions/",
	});

	// Fully dynamic template for comparison
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "dynamic",
		functionsDir: "./functions/",
	});

	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "dynamic_fb",
		functionsDir: "./functions/",
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