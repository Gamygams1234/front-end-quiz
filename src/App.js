
import "./App.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Header from "./smallComponents/Header";
import GameScreen from "./Components/GameScreen";
import Endgame from "./Components/Endgame";
import HomeScreen from "./Components/Homescreen";

function App() {
  const [playing, setPlaying] = useState(false);
  const [subject, setSubject] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);




  let classNames = clsx(["main", { dark: darkMode }]);

  const increaseScore = () => {
    setScore(score + 1);
  };
  const nextQuestion = () => {
    setIndex(index + 1);
  };

  const resetGame = () => { 
    setSubject("")
    setScore(0);
    setIndex(0);
    setPlaying(false);
  };
  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  if (!playing) {
    return (
      <div className={classNames}>
        <div className="page bg-light-grey pb-5">
          <Header subject={subject} changeTheme={changeTheme} darkMode={darkMode}></Header> 
          <HomeScreen data={data} setSubject={setSubject} setScore={setScore} setIndex={setIndex} setPlaying={setPlaying}></HomeScreen>
        </div>
      </div>
    );
  } else if (playing && index < 10) {
    return (
      <div className={classNames}>
        <div className="page bg-light-grey pb-5">
          <Header subject={subject} changeTheme={changeTheme} darkMode={darkMode}></Header>
          <GameScreen index={index} subject={subject} score={score} increaseScore={increaseScore} nextQuestion={nextQuestion} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={classNames}>
        <div className="page bg-light-grey pb-5">
          <Header subject={subject} changeTheme={changeTheme} darkMode={darkMode}></Header>
          <Endgame resetGame={resetGame} subject={subject} score={score}/>
        </div>
      </div>
    );
  }
}

export default App;
