const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");
const verifytoken = require("../middlewares/verifyToken");
const {
  checkIDNumber,
  checkPhoneNumber,
  checkMedicalRecord,
  checkAddress,
  checkEmail,
  checkUserName,
} = require("../middlewares/checkInputs");

router.post(
  "/registerpatient",
  verifytoken,
  checkIDNumber,
  checkUserName,
  checkEmail,
  checkAddress,
  checkPhoneNumber,
  checkMedicalRecord,
  patientsController.registerPatient
);

router.get("/search", patientsController.searchPatient);

// Only doctors can add a new medical record, admins can't do that because you must be a doctor to diagnose a patient
router.post(
  "/addnewmedicalrecord",
  verifytoken,
  checkIDNumber,
  checkMedicalRecord,
  patientsController.addNewMedicalRecord
);

router.post(
  "/updatecontact",
  verifytoken,
  checkIDNumber,
  checkEmail,
  checkPhoneNumber,
  patientsController.updateContact
);

router.use((err, req, res, next) => {
  console.log("from patients route middleware", err.message);
});

module.exports = router;
