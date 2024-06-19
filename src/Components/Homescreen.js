export default function HomeScreen(props){
    const {data, setSubject, setScore, setIndex, setPlaying} = props
    return(
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
    )
}