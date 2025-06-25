import "./About.css";
import { useSelector } from "react-redux";

const About = () => {
  const userSelector = useSelector((state) => state.user);

  console.log(userSelector.username);

  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>
        This is a patient registration system Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Nulla facere atque distinctio cumque
        consequatur eveniet, fugit modi aperiam perferendis fugiat quam
        voluptatum labore error corporis debitis voluptate odio omnis deleniti!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam eaque
        architecto veritatis porro, maiores perspiciatis fugiat accusantium
        accusamus corrupti. Beatae, consequatur sint! Facere aliquid magnam
        sapiente tenetur quae error doloribus? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Delectus reprehenderit necessitatibus
        dolorem veritatis aperiam mollitia incidunt eum ab id officiis
        recusandae hic qui, illo fugiat. Tempore earum nisi praesentium
        laboriosam.
      </p>
    </div>
  );
};
export default About;
