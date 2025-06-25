import "./CustomForm.css";

export default function CustomForm(props) {
  return <form action="">{props.children}</form>;
}
CustomForm.IDnumber = function IDNumberField(props) {
  return (
    <input
      type="number"
      name="idnumber"
      placeholder="ID Number"
      value={props.value}
      onChange={props.onChange}
    />
  );
};
CustomForm.Email = function EmailField(props) {
  return (
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={props.value}
      onChange={props.onChange}
    />
  );
};
CustomForm.Password = function PasswordField(props) {
  return (
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={props.value}
      onChange={props.onChange}
    />
  );
};
CustomForm.UserName = function UserNameField(props) {
  return (
    <input
      type="text"
      name="username"
      placeholder="Username"
      value={props.value}
      onChange={props.onChange}
    />
  );
};
CustomForm.Address = function AddressField(props) {
  return (
    <input
      type="text"
      name="address"
      placeholder="Address"
      value={props.value}
      onChange={props.onChange}
    />
  );
};
CustomForm.Phone = function PhoneField(props) {
  return (
    <input
      type="text"
      name="Phonenumber"
      placeholder="Phone"
      value={props.value}
      onChange={props.onChange}
    />
  );
};
CustomForm.MedicalRecord = function MedicalRecordField(props) {
  return (
    <textarea
      type="text"
      name="medicalrecord"
      rows={10}
      // this means user can type up to 10 lines
      placeholder="Enter The Medical Record"
      style={{ width: "100%" }}
      // to style an element here we should use the above syntax
      value={props.value}
      onChange={props.onChange}
    />
  );
};
CustomForm.Image = function ImageField(props) {
  return <input type="file" onChange={props.onChange} />;
};
