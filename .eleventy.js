const eleventyVue = require("@11ty/eleventy-plugin-vue");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyVue, {
    cacheDirectory: "/tmp/.cache/vue/"
  });

  return {
    dir: {
      input: "src"
    }
  };
};