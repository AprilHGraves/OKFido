const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput(data) { 
  data.email = validText(data.email) ? data.email : "";
  data.username = validText(data.username) ? data.username : "";
  data.password = validText(data.password) ? data.password : "";

  // if (!Validator.isEmail(data.email)) {
  //   return { message: "Email is invalid", isValid: false };
  // }

  if (Validator.isEmpty(data.email)) {
    return { message: "Uh-oh! Please enter your email to login.", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Uh-oh! Please enter your password to login.", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};