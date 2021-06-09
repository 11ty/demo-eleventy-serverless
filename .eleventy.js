const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
	// Render on first-request
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "serverless",
		functionsDir: "./netlify/functions/",
	});

	// Fully dynamic template for comparison
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "dynamic",
		functionsDir: "./netlify/functions/",
	});

	return {
		dir: {
			input: "src"
		}
	};
};