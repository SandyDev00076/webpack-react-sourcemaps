const PORT = 5050;

// Github related config
const USER = "SandyDev00076";
const REPO = "webpack-react-sourcemaps";
const GITHUB_TOKEN = "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";

const download = require("download");
const express = require("express");
const fetch = require("node-fetch");
const app = express();

async function getSourceMapFromCIServer() {
  const res = await fetch(
    `https://api.github.com/repos/${USER}/${REPO}/actions/artifacts`
  );
  const data = await res.json();
  // filter out artifacts containing name as source-maps
  const sourceMapArtifacts = data.artifacts.filter(
    (artifact) => artifact.name === "source-maps"
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
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
}

app.get("/:name", (req, res) => {
  console.log(req.params.name);
});

app.listen(PORT, () => {
  getSourceMapFromCIServer();
  console.log(`Source Map Server is listening on ${PORT}!`);
});
