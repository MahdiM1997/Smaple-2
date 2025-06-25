import { useState } from "react";
import CustomForm from "../../components/CustomForm/CustomForm";
import Button from "../../components/Button/Button";
import { makeGETrequest, makePOSTrequest } from "../../utils/api";
import { useSelector } from "react-redux";
import "./SearchDoctor.css";

const SearchDoctor = () => {
  const [idnumber, setIdNumber] = useState("");
  const [messageDoc, setMessageDoc] = useState("");
  const [doctor, setDoctor] = useState({});
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [showUpdateContactFields, setShowUpdateContactFields] = useState(false);
  const userSelector = useSelector((state) => state.user);

  async function submitSearch(e) {
    e.preventDefault();
    const res = await makeGETrequest(
      `http://localhost:5000/doctors/search?idnumber=${idnumber}`
    );
    setMessageDoc(res.message);

    if (res.doctor) {
      setDoctor(JSON.parse(res.doctor));
    } else {
      setDoctor({});
    }
  }
  async function updateContact(e) {
    e.preventDefault();
    const res = await makePOSTrequest(
      "http://localhost:5000/doctors/updatecontact",
      {
        idnumber: doctor.idnumber,
        email: updatedEmail,
        phone: updatedPhone,
      },
      localStorage.getItem("token")
    );

    if (res.status === 201) {
      setShowUpdateContactFields(!showUpdateContactFields);
      setDoctor(JSON.parse(res.doctor));
    }
    setMessageDoc(res.message);
  }

  return (
    <div className="searchDoctor-container">
      <h2>Search</h2>
      <CustomForm>
        <CustomForm.IDnumber
          value={idnumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
        <br />
        <Button value="Search" onClick={submitSearch} />
        <br />
      </CustomForm>
      {/* && means that if whatever comes before the taht symbol was true then run whatever that comes after && (this is like and in excel) */}
      {doctor.username && (
        <div style={{ marginTop: "30px" }}>
          <p>
            <span style={{ fontWeight: "bold" }}>id : </span>
            {doctor.idnumber}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Doctor : </span>
            {doctor.username}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Email : </span>
            {doctor.email}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Phone : </span>
            {doctor.phone}
          </p>

          {/* only admin can update doctor contact info */}
          {userSelector.admin && (
            <Button
              value="Edit doctor contact information"
              onClick={() =>
                setShowUpdateContactFields(!showUpdateContactFields)
              }
            />
          )}
          <br />
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
        </div>
      )}

      {messageDoc}
    </div>
  );
};
export default SearchDoctor;
