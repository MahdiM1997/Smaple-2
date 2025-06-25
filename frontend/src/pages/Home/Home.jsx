import { useSelector } from "react-redux";
import "./Home.css";

const Home = () => {
  const userSelector = useSelector((state) => state.user);
  return (
    <div className="home-container">
      <h1>Welcome To Patient Management System</h1>
      <h3>
        {userSelector.username ? (
          <p>
            Welcome
            <br />
            <span style={{ color: "darkgreen" }}>{userSelector.username}</span>
          </p>
        ) : (
          <p style={{ color: "red" }}> you are not logged in</p>
        )}
      </h3>
      <div className="features">
        <div className="feature">
          <h3>Patient Register</h3>
          <p>Register new patients into the system</p>
          <a href="/registerpatient">Register Patient</a>
          {/* as long as you define a path in main.jsx for these elements you dont have a problem  */}
        </div>
        <div className="feature">
          <h3>Search Patient</h3>
          <p>View and manage medical history of patients</p>
          <a href="/searchpatient">View Medical History</a>
        </div>
      </div>
    </div>
  );
};
export default Home;
