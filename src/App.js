import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Header from "./smallComponents/Header";
import GameScreen from "./Components/GameScreen";
import Endgame from "./Components/Endgame";

function App() {
  const [playing, setPlaying] = useState(false);
  const [subject, setSubject] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    console.log(subject);
  }, [subject]);

  useEffect(() => {
    console.log(data?.quizzes);
  }, [data]);
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
          <div className="start-game grid-container">
            <div className="headline">
              <h2 className="fw-200 mb-1 text-dark-navy">Welcome to the</h2>
              <h2 className="mb-5 fw-600 text-dark-navy">Frontend Quiz!</h2>
              <h5 className="italic text-grey-navy">Pick a subject to get started.</h5>
            </div>
            <div className="game-selections">
              {data?.quizzes &&
                data?.quizzes.map((quiz) => {
                  return (
                    <div
                      onClick={() => {
                        setSubject(quiz);
                        setScore(0);
                        setIndex(0);
                        setPlaying(true);
                      }}
                      className="selection fw-500 bg-pure-white text-dark-navy"
                    >
                      <img className={quiz.title.toLowerCase() + "-icon icon"} src={quiz.icon} alt={quiz.title} />
                      <div>{quiz.title}</div>
                    </div>
                  );
                })}
            </div>
          </div>
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
