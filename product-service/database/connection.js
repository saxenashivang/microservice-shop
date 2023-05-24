const mongoose = require("mongoose");
const db = require("../config/config").get(process.env.NODE_ENV);

module.exports = async () => {
  try {
    await mongoose.connect(db.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db Connected");
  } catch (error) {
    console.log("Error ============");
    console.log(error);
    process.exit(1);
  }
};
