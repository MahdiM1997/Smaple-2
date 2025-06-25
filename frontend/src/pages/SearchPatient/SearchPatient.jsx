import { useState } from "react";
import CustomForm from "../../components/CustomForm/CustomForm";
import Button from "../../components/Button/Button";
import { makePOSTrequest, makeGETrequest } from "../../utils/api";
import { useSelector } from "react-redux";
import "./SearchPatient.css";

const SearchPatient = () => {
  const [idnumber, setIdnumber] = useState("");
  const [message, setMessage] = useState("");
  const [patient, setPatient] = useState("");
  const [newMedicalRecord, setNewMedicalRecord] = useState("");
  const [
    showNewMedicalRecordFieldAndButton,
    setShowNewMedicalRecordFieldAndButton,
  ] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [showUpdateContactFields, setShowUpdateContactFields] = useState(false);

  const userSelector = useSelector((state) => state.user);

  async function submitSearch(e) {
    e.preventDefault();
    const res = await makeGETrequest(
      `http://localhost:5000/patients/search?idnumber=${idnumber}`
    );
    setMessage(res.message);

    if (res.patient) {
      setPatient(JSON.parse(res.patient));
    } else {
      setPatient({});
    }
  }

  async function submitNewMedicalRecord(e) {
    e.preventDefault();
    const res = await makePOSTrequest(
      `http://localhost:5000/patients/addnewmedicalrecord`,
      {
        medicalrecord: newMedicalRecord,
        idnumber: patient.idnumber,
      },
      localStorage.getItem("token")
    );

    if (res.status === 201) {
      setNewMedicalRecord("");
      setShowNewMedicalRecordFieldAndButton(
        !showNewMedicalRecordFieldAndButton
      );
      setPatient(JSON.parse(res.patient));
    }
    setMessage(res.message);
  }

  async function updateContact(e) {
    e.preventDefault();
    const res = await makePOSTrequest(
      `http://localhost:5000/patients/updatecontact`,
      {
        idnumber: patient.idnumber,
        email: updatedEmail,
        phone: updatedPhone,
      },
      localStorage.getItem("token")
    );
    if (res.status === 201) {
      setShowUpdateContactFields(!showUpdateContactFields);
      setPatient(JSON.parse(res.patient));
    }
    setMessage(res.message);
  }
  return (
    <div className="SearchPatient-container">
      <h2>Search</h2>
      <CustomForm>
        <CustomForm.IDnumber
          value={idnumber}
          onChange={(e) => setIdnumber(e.target.value)}
        />
        <Button value="Search" onClick={submitSearch} />
        <br />
      </CustomForm>

      {patient.username && (
        <div style={{ marginTop: "30px" }}>
          <p>
            <span style={{ fontWeight: "bold" }}>id : </span>
            {patient.idnumber}
          </p>

          <p>
            <span style={{ fontWeight: "bold" }}>patient : </span>
            {patient.username}
          </p>

          <p>
            <span style={{ fontWeight: "bold" }}>Email : </span>
            {patient.email}
          </p>

          <p>
            <span style={{ fontWeight: "bold" }}>Address : </span>
            {patient.address}
          </p>

          <p>
            <span style={{ fontWeight: "bold" }}>Phone : </span>
            {patient.phone}
          </p>
          <ul>
            {/* we can not show values of an array directly we need to loop it to be able to demonstrate it */}
            <span style={{ fontWeight: "bold" }}>Medical Record:</span>
            {patient.medicalrecord.map((item, index) => (
              <li key={index}>
                {item.date}:{item.record}
              </li>
            ))}
          </ul>

          {/* onlt a doctor can diagnose a patient so add new medical record */}
          {userSelector.doctor && (
            <Button
              value="Add new medical record"
              onClick={() =>
                setShowNewMedicalRecordFieldAndButton(
                  !showNewMedicalRecordFieldAndButton
                )
              }
            />
          )}

          {/* only admin can update patient contact info */}
          {userSelector.admin && (
            <Button
              value="Update patient contact information"
              onClick={() =>
                setShowUpdateContactFields(!showUpdateContactFields)
              }
            />
          )}
          <br />

          {showUpdateContactFields && (
            <CustomForm>
              <CustomForm.Email
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              <CustomForm.Phone
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
              />
              <Button value="Update" onClick={updateContact} />
            </CustomForm>
          )}
          {showNewMedicalRecordFieldAndButton && (
            <CustomForm>
              <CustomForm.MedicalRecord
                value={newMedicalRecord}
                onChange={(e) => setNewMedicalRecord(e.target.value)}
              />
              <Button value="save" onClick={submitNewMedicalRecord} />
            </CustomForm>
          )}
        </div>
      )}
      {message}
      <br />
    </div>
  );
};

export default SearchPatient;
