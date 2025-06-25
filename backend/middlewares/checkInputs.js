// const error = require("formidable/FormidableError");
const returnStatus = require("../helpers/returnStatus");
// const { path } = require("../routes/doctors");

function checkIDNumber(req, res, next) {
  const { idnumber } = req.body;
  if (!idnumber) {
    returnStatus(res, 404, true, "idnumber field is missing");
    return next(new Error("idnumber field is missing"));
  }

  // Check if the idnumber only contains numbers and it MUST have 8 digits assuming the idnumber of a citizen has 8 digits
  const idnumberRegex = /^\d{8}$/;
  const result = idnumberRegex.test(idnumber);
  if (!result) {
    returnStatus(res, 400, true, "idnumber is invalid");
    return next(new Error("idnumber is invalid"));
  }
  next();
}

function checkUserName(req, res, next) {
  const { username } = req.body;
  if (!username) {
    returnStatus(res, 400, true, "username field is missing");
    return next(new Error("username field is missing"));
  }

  // Check if the username only contains characters between 'a-z' or 'A-Z'
  const usernameRegex = /^[a-zA-Z\s]/;

  // Check if the length of the username is within the limit 50 characters
  if (username.length > 40) {
    returnStatus(res, 400, true, "username too long");
    return next(new Error("username too long"));
  }

  // Check if the username matches the regular expression
  const result = usernameRegex.test(username);

  if (!result) {
    returnStatus(res, 400, true, "username is invalid");
    return next(new Error("username is invalid"));
  }
  //   If this line is reached then continue,everything is ok
  next();
}

function checkPassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    returnStatus(res, 400, true, "Password is missing");
    return next(new Error("Password is missing"));
  }
  if (password.length > 20) {
    returnStatus(
      res,
      400,
      true,
      "password too long , max 20 characters allowed"
    );
    return next(new Error("password too long , max 20 chracters allowed"));
  }
  //   If this line is reached then continue,everything is ok
  next();
}

function checkEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    returnStatus(res, 400, true, "Email is missing");
    return next(new Error("Email is missing"));
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the total length of the email address does not exceed 50 characters
  if (email.length > 50) {
    returnStatus(res, 400, true, "Email too long");
    return next(new Error("Email too long"));
  }
  const result = emailRegex.test(email);
  if (!result) {
    returnStatus(res, 400, true, "Email format is invalid !");
    return next(new Error("Email format is invalid !"));
  }

  //   If this line is reached then continue,everything is ok
  next();
}

function checkAddress(req, res, next) {
  const { address } = req.body;

  if (!address) {
    returnStatus(res, 400, true, "Address is missing");
    return next(new Error("Address is missing"));
  }

  if (address.length > 100) {
    returnStatus(res, 400, true, "address too long");
    return next(new Error("address too long"));
  }

  //   allow .,/'-
  const addressRegex = /^[a-zA-Z0-9\s.,\/'-]+$/;
  const result = addressRegex.test(address);

  if (!result) {
    returnStatus(res, 400, true, "address is invalid");
    return next(new Error("address is invalid"));
  }
  next();
}

function checkPhoneNumber(req, res, next) {
  const { phone } = req.body;

  if (!phone) {
    returnStatus(res, 400, true, "phone is missing");
    return next(new Error("phone is missing"));
  }
  if (phone.length > 14) {
    returnStatus(res, 400, true, "invalid number");
    return next(new Error("invalid number"));
  }
  /*
  These kind of numbers will be valid:
      123-456-7890
      +1
      (123) 456-7890 
      123 456 7890
      +1 (123) 456-7890
      +123456789012345
      123456789012345
  */
  const phoneRegex = /^[0-9 ()+-]+$/;
  const result = phoneRegex.test(phone);
  if (!result) {
    returnStatus(res, 400, true, "phone is invalid");
    return next(new Error("phone is invalid"));
  }
  next();
}

function checkMedicalRecord(req, res, next) {
  const { medicalrecord } = req.body;
  if (medicalrecord.length > 500) {
    returnStatus(res, 400, true, "medical record too long !");
    return next(new Error());
  }

  // ^$ means allow empty string. Allow an empty string in addition to any string that doesn't contain <  >  |
  const medicalRecordRegex = /^(?:[^<>|]*)$/;
  const result = medicalRecordRegex.test(medicalrecord);

  if (!result) {
    returnStatus(res, 400, true, "Medical record is invalid");
    return next(new Error("Medical record is invalid"));
  }

  next();
}

module.exports = {
  checkIDNumber: checkIDNumber,
  checkUserName: checkUserName,
  checkPassword: checkPassword,
  checkEmail: checkEmail,
  checkAddress: checkAddress,
  checkPhoneNumber: checkPhoneNumber,
  checkMedicalRecord: checkMedicalRecord,
};
