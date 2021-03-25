const eleventyVue = require("@11ty/eleventy-plugin-vue");

module.exports = function(eleventyConfig) {
  let eleventyVueOptions = {};
  if(process.env.ELEVENTY_CLOUD) {
    eleventyVueOptions.cacheDirectory = "/tmp/.cache/vue/"
  }
  eleventyConfig.addPlugin(eleventyVue, eleventyVueOptions);

  return {
    dir: {
      input: "src"
    }
  };
};