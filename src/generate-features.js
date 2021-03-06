import fs from "fs"
import path from "path"

const features = fs
  .readdirSync(
    path.join(
      path.dirname(require.resolve("caniuse-db/package.json")),
      "features-json"
    )
  )
  .map(file => file.replace(".json", ""))
  .map(feature => `"${feature}": function() { return require("${path.join("caniuse-db", "features-json", feature)}")}`)

fs.writeFileSync(path.join(__dirname, "..", "features.js"), `module.exports = {${features.join(",\n")}}`)
