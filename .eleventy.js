const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "serverless",
		functionsDir: "./netlify/functions/",
		copy: [
			// Advanced options:

			// Self generated collections for re-use
			// (Check netlify/functions/serverless/index.js for injection)
			// "_generated-serverless-collections.json",

			// Save build-time data cache (no run-time data requests!)
			// { from: ".cache/eleventy-cache-assets/", to: "cache" },
		]
	});

	return {
		dir: {
			input: "src"
		}
	};
};