let ex = require("uu_frontendOneg01-uu5lib--version-check");
let versionCheck = require("./_version-check-template.js");
if (ex?.name === "uu_frontendOneg01-uu5lib") versionCheck(ex?.name, ex?.version);
module.exports = ex;
