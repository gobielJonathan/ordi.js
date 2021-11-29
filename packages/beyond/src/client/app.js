import { Helmet } from "react-helmet-async";
import "./app.css";
import dummy from "./dummy.png";

const App = () => {
  return (
    <>
      <Helmet>
        <title>App</title>
      </Helmet>
      <div className="App">
        <div className="title">
          hello world from beyond changes testing from changes 12390123
        </div>
        <img src={dummy} alt="dummy" />
      </div>
    </>
  );
};
export default App;
