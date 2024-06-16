import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";

function App() {
  const [playing, setPlaying] = useState(false);
  const [subject, setSubject] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  let classNames = clsx(["main", {"dark": darkMode}])
  // useEffect(()=>{
  //   console.log(data)
  // }, [data])

  const changeTheme = () =>{
      setDarkMode(!darkMode)
  }

  if (!playing) {
    return (
      <div className={classNames}>
        <div className="page bg-light-grey">
          <h1>Not Playing</h1>
          <button
            onClick={() => {
              changeTheme();
            }}
          >
            Playing
          </button>
        </div>
      </div>
    );
  } else if (playing) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
