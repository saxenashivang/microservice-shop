const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config/config").get(process.env.NODE_ENV);

// Utility functions
(module.exports.GenerateSalt = async () => await bcrypt.genSalt()),
  (module.exports.GeneratePassword = async (password, salt) => await bcrypt.hash(password, salt);


module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => await this.GeneratePassword(enteredPassword, salt) === savedPassword;

(module.exports.GenerateSignature = async (payload) => await jwt.sign(payload, config.SECRET, { expiresIn: '1d'} )),
  (module.exports.ValidateSignature = async (req) => {
    const signature = req.get("Authorization");

    if (signature) {
      const payload = await jwt.verify(signature.split(" ")[1], config.SECRET);
      console.log("payload", signature);
      req.user = payload;
      return true;
    }

    return false;
  });

module.exports.FormateData = (data) => {
        if(data){
            return { data }
        }
            throw new Error('Data Not found!')
        
    }
