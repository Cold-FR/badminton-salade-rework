const DeltaBuilder = require("@electron-delta/builder");

const path = require("path");
const getPreviousReleases = require("./build/get-previous-releases");

const options = {
  productIconPath: path.join(__dirname, "icon.ico"),
  productName: "Badminton Salade",
  getPreviousReleases: ({ platform, target }) => {
    console.log("getPreviousReleases", platform, target);
    return getPreviousReleases({ platform, target });

    /*return [
      {
        version: '0.0.2',
        url: 'https://github.com/Cold-FR/badminton-salade-rework/releases/download/v0.0.2/BadmintonSalade-0.0.2.exe'
      },
      {
        version: '0.0.1',
        url: 'https://github.com/Cold-FR/badminton-salade-rework/releases/download/v0.0.1/BadmintonSalade-0.0.1.exe'
      }
    ];*/
  },
  sign: async (filePath) => {
    // sign each delta executable
    return filePath;
  },
};

exports.default = async function (context) {
  const deltaInstallerFiles = await DeltaBuilder.build({
    context,
    options,
  });
  return deltaInstallerFiles;
};