export default function (eleventyConfig) {
  // Copy static assets to _site
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addGlobalData("layout", "layout.11ty.js");

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
