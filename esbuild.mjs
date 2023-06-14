import * as esbuild from "esbuild";

(async () => {
  await esbuild.build({
    entryPoints: ["./src/main.js"],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["chrome58", "firefox57", "safari11", "edge16"],
    outfile: "./dist/es6/alasql.js",
  });

  await esbuild.build({
    entryPoints: ["./src/main.js"],
    bundle: true,
    platform: "node",
    target: ["node12"],
    packages: "external",
    outfile: "./dist/alasql.fs.js",
  });
})();
