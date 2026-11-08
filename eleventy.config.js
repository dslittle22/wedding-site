import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // Copy static assets to _site
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images/*.svg");
  eleventyConfig.addPassthroughCopy("src/images/og.jpg");
  eleventyConfig.addGlobalData("layout", "layout.11ty.js");

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["avif", "webp", "jpeg"],
    widths: [320, 480, 640, 800, 1200],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
