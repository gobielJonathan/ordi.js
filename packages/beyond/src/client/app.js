import "./app.css";
import dummy from "./dummy.png";

const App = () => {
  return (
    <div className="App">
      <div className="title">hello world from beyond</div>
      <img src={dummy} alt="dummy" />
    </div>
  );
};
export default App;
