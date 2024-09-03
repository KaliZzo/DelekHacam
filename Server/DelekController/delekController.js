const DorAlon = require("../model/DorAlonModel");
const Sonol = require("../model/SonolModel");
// Import other models as needed

exports.getDelekData = async (req, res) => {
  try {
    const dorAlonData = await DorAlon.findOne().sort({ createdAt: -1 });
    const sonolData = await Sonol.findOne().sort({ createdAt: -1 });
    // Fetch data from other models

    res.status(200).json({
      status: "success",
      data: {
        dorAlon: dorAlonData,
        sonol: sonolData,
        // Include other companies' data
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
