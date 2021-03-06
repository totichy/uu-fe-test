let reloaded;

module.exports = function (depLibName, depLibVersion) {
  if (!reloaded && depLibVersion && depLibVersion !== process.env.VERSION && (typeof Uu5Loader !== "undefined" || typeof SystemJS !== "undefined") && process.env.NODE_ENV !== "test") {
    // reload all libs to prevent cascading effect
    // following scenario would otherwise need 2 navigations:
    //   if C imports B, B imports A; libs A,B are from cache, C is fresh and newer version;
    //   C detects mismatch and would reload only B, so we would need full-page navigation and only then B would reload A
    reloaded = true;
    let myName = process.env.OUTPUT_NAME.split(/[\\/\\\\]/).pop(); // not using NAME due to submodules
    let libs = ["uu_frontendOneg01-uu5lib"];
    console.warn(
      `Inconsistent library versions loaded: ${myName}@${process.env.VERSION} vs ${depLibName}@${depLibVersion}.
Libraries will be reloaded, bypassing HTTP cache: ${libs}.
Any errors related to version mismatch due to HTTP cache should be fixed after next full-page navigation.`
    );
    let resolve;
    if (typeof Uu5Loader !== "undefined") {
      resolve = Uu5Loader.resolve;
    } else {
      resolve = function (name) {
        let result = SystemJS.normalizeSync(name);
        return result.slice(-name.length - 1) === "/" + name ? null : result;
      };
    }
    let baseUri = resolve(myName)?.replace(/[^/\\]*$/, "") || resolve(".");
    let minSuffix = process.env.NODE_ENV === "production" ? ".min" : "";
    for (let lib of libs) {
      let uri = resolve(lib);
      if (!uri) {
        if (process.env.NODE_ENV !== "production" && resolve(".").match(/^http:\/\/localhost[:\/]/)) {
          console.log("Skipping reload of: " + lib) // might be running on different localhost port
          continue;
        }
        uri = baseUri + lib + minSuffix + ".js";
      }
      fetch(uri, { cache: "reload" });
    }
  }
}
