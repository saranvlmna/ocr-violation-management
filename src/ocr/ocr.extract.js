module.exports = (req, res) => {
  try {
    console.log(req.file);
    console.log(req.file.mimetype);
  } catch (error) {
    console.log(error);
  }
};
