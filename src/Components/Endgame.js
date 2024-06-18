export default function Endgame(props) {
  const { resetGame, score, subject } = props;
  return (
    <div className="grid-container">
      <div className="headline">
        <h2 className="fw-200 mb-1 text-dark-navy">Quiz Completed</h2>
        <h2 className="mb-5 fw-600 text-dark-navy">You scored...</h2>
      </div>
      <div className="details">
        <div className="specifics bg-pure-white mb-4">
          <div className="subject mb-4">
            <div className="main-selection fw-500  text-dark-navy">
              <img className={subject.title.toLowerCase() + "-icon icon"} src={subject.icon} alt={subject.title} />
              <div>{subject.title}</div>
            </div>
          </div>
          <div className="score text-dark-navy fw-500 mb-4">{score}</div>
          <h5 className="text-grey-navy">out of 10</h5>

          
        </div>

        <button onClick={resetGame} className="fw-600">
          Play Again
        </button>
      </div>
    </div>
  );
}
