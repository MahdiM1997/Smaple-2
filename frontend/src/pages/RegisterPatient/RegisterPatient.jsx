import "./RegisterPatient.css";
import CustomForm from "../../components/CustomForm/CustomForm";
import { useState } from "react";
// to move between diffrent directories we have to use the syntax above.
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { makePOSTrequest } from "../../utils/api";
// you don't need to use bracket{} for importing files or modules but it is needed for importing a function

const RegisterPatient = () => {
  const [idnumber, setIDnumber] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [medicalrecord, setMedicalRecord] = useState("");
  const [message, setMessage] = useState("");
  const userSelector = useSelector((state) => state.user);

  async function registerPatient(e) {
    e.preventDefault();
    const res = await makePOSTrequest(
      "http://localhost:5000/patients/registerpatient",
      {
        idnumber,
        username,
        email,
        address,
        phone,
        medicalrecord,
      },
      localStorage.getItem("token")
    );
    setMessage(res.message);
  }

  return (
    <div className="registerpatient-container">
      <h2>Register Patient</h2>
      <CustomForm>
        <CustomForm.IDnumber
          value={idnumber}
          onChange={(e) => setIDnumber(e.target.value)}
        />
        <CustomForm.UserName
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <CustomForm.Email
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomForm.Address
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <CustomForm.Phone
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {userSelector.doctor && (
          <CustomForm.MedicalRecord
            value={medicalrecord}
            onChange={(e) => setMedicalRecord(e.target.value)}
          />
        )}
        <br />
        <Button value="Register" onClick={registerPatient} />
      </CustomForm>

      {message}
    </div>
  );
};
export default RegisterPatient;
