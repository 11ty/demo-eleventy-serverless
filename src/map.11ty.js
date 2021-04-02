// Creates content map for netlify function

exports.data = {
  permalink: "./netlify/functions/cloud/map.json",
  permalinkBypassOutputDir: true,
  eleventyExcludeFromCollections: true,
};

exports.render = function(data) {
  let map = {};
  for(let entry of data.collections.all) {
    map[entry.data.page.url] = entry.data.page.inputPath;
  }

  return JSON.stringify(map);
};