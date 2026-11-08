import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownItLinkAttributes from "markdown-it-link-attributes";

export default function (eleventyConfig) {
  // Open absolute (http/https) links in a new tab
  eleventyConfig.amendLibrary("md", (md) =>
    md.use(markdownItLinkAttributes, {
      matcher: (href) => /^https?:\/\//.test(href),
      attrs: { target: "_blank", rel: "noopener noreferrer" },
    }),
  );

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
