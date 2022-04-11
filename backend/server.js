const PORT = 5050;

// Github related config
const USER = "SandyDev00076";
const REPO = "webpack-react-sourcemaps";
const SOURCE_MAP_ARTIFACT_NAME = "source-maps";

const download = require("download");
const express = require("express");
const fetch = require("node-fetch");
const streamZip = require("node-stream-zip");
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
let zip;

async function getSourceMapFromCIServer() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${USER}/${REPO}/actions/artifacts`
    );
    const data = await res.json();
    // filter out artifacts containing name as source-maps
    const sourceMapArtifacts = data.artifacts.filter(
      (artifact) => artifact.name === SOURCE_MAP_ARTIFACT_NAME
    );
    if (sourceMapArtifacts.length === 0) {
      throw new Error("No source maps found from the CI server");
    }

    // get the relevant artifact entry (here, taking the first entry, but you can find out the latest one of these)
    const relevantArtifact = sourceMapArtifacts[0];

    // get the archive download URL from the artifact
    const artifactArchiveURL = relevantArtifact["archive_download_url"];

    // download the archive in the current location only
    await download(artifactArchiveURL, `${__dirname}`, {
      headers: {
        Authorization: `token ${process.env["GITHUB_ACCESS_TOKEN"]}`,
      },
    });

    // extract the zip file
    zip = new streamZip.async({
      file: `${SOURCE_MAP_ARTIFACT_NAME}.zip`,
    });
  } catch (e) {
    console.error(e);
  }
}

app.get("/:name", async (req, res) => {
  if (!zip) {
    res.sendStatus(404);
  } else {
    // await zip.extract(req.params.name, req.params.name);
    const data = await zip.entryData(req.params.name);
    await zip.close();
    res.json(JSON.parse(data.toString));
  }
});

app.listen(PORT, () => {
  getSourceMapFromCIServer();
  console.log(`Source Map Server is listening on ${PORT}!`);
});
