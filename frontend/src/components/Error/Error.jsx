import { useRouteError } from "react-router-dom";
import "./Error.css";

export default function Error() {
  const error = useRouteError();
  return (
    <div id="error">
      <h2>Oops!</h2>
      <p>Sorry, an unexpected error has occured</p>
      <p>
        <i>
          {/* || = or */}
          {error.statusText || error.message}
        </i>
      </p>
    </div>
  );
}
