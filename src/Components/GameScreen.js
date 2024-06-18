import { useEffect, useState } from "react";

export default function GameScreen(props) {
  const { index, subject, score, nextQuestion, increaseScore } = props;
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const progress = (score / 10) * 100;

  const clearSelected = () => {
    document.querySelectorAll(".selected").forEach((o) => o.classList.remove("selected"));
  };

  const selectOption = (element, opt) => {
    if (!submitted) {
      setSelected(opt);
      clearSelected();
      if (element.target.classList.contains("option")) {
        element.target.classList.add("selected");
      } else {
        element.target.parentElement.classList.add("selected");
      }
    }
  };

  const submit = () => {
    if (selected === "") {
      document.getElementById("warning").style.display = "flex";
    } else if (selected === subject.questions[index].answer) {
      document.getElementById("warning").style.display = "none";
      document.querySelectorAll(".selected")[0].classList.add("right");
      document.getElementById("quiz").classList.add("answered");
      document.getElementById("quiz").classList.remove("in-play");
      setSubmitted(true);

      increaseScore();
    } else {
      document.getElementById("warning").style.display = "none";
      document.querySelectorAll(".selected")[0].classList.add("wrong");
      document.getElementById("quiz").classList.add("answered");
      document.getElementById("quiz").classList.remove("in-play");
      setSubmitted(true);

      //   nextQuestion();
    }
    // proceed();
  };
  const proceed = () => {
    document.getElementById("quiz").classList.add("in-play");
    document.getElementById("quiz").classList.remove("answered");
    setSelected("");
    setSubmitted(false);
    nextQuestion();
  };
  return (
    <div className="grid-container">
      <div className="question">
        <div className="question-details">
          <h5 className="italic fw-500 text-grey-navy mb-4">Question {index + 1} out of 10</h5>
          <h4 className="fw-200 fw-600 text-dark-navy">{subject.questions[index].question}</h4>
        </div>
        <div className="bar">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div id="quiz" className="quiz in-play">
        {subject.questions[index].options.map((option, idx) => {
          if (option === subject.questions[index].answer) {
            return (
              <div
                key={option}
                onClick={(e) => {
                  selectOption(e, option);
                }}
                className="option fw-500 bg-pure-white correct text-dark-navy"
              >
                {" "}
                <span>{String.fromCharCode(idx + 65)}</span>
                <div className="answer">{option}</div>
                <img src="/images/icon-correct.svg" /> 
              </div>
            );
          }else{   return (
            <div
              key={option}
              onClick={(e) => {
                selectOption(e, option);
              }}
              className="option fw-500 bg-pure-white text-dark-navy"
            >
              {" "}
              <span>{String.fromCharCode(idx + 65)}</span>
              <div className="answer">{option}</div>
               <img src="/images/icon-error.svg" />
            </div>
          );

          }
       
        })}
        {!submitted ? (
          <button onClick={submit} className="fw-500">
            Submit Answer
          </button>
        ) : (
          <button onClick={proceed} className="fw-500">
            Next Question
          </button>
        )}{" "}
        <div id="warning" className="warning text-red fw-400">
          <img src="/images/icon-incorrect.svg" /> Please select an answer
        </div>
      </div>
    </div>
  );
}
