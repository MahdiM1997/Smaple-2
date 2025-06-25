import { useState } from "react";
import CustomForm from "../../components/CustomForm/CustomForm";
import Button from "../../components/Button/Button";
import { makePOSTrequest } from "../../utils/api";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setmessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitData = async (e) => {
    e.preventDefault();
    // when you click on a button ,usually the page is refreshed automatically (this is a default browser behavior) and by using this function we say do not refresh the page.
    const res = await makePOSTrequest("http://localhost:5000/users/signin", {
      email,
      password,
      // if the key and value are the same we can omit the value
    });
    // save the token coming back from the backend only if the status code is 200
    if (res.status === 200) {
      localStorage.setItem("token", res.token);

      dispatch(login({ username: res.username }));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    setmessage(res.message);
  };
  return (
    <div className="signin-container">
      <h2>Sign in</h2>
      <CustomForm>
        <CustomForm.Email
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomForm.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={submitData} value="Sign In" />
      </CustomForm>
      {message}
    </div>
  );
};
export default Signin;
