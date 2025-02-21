const azureFileUpload = require("./lib/azure.fileUpload");

module.exports = async (req, res) => {
  try {
    const fileUrl = await azureFileUpload(req.file);
    return res.json({ fileUrl });
  } catch (error) {
    console.log(error);
  }
};
