function QuizCard({ item, index, selectedChoice, onAnswer }) {
  const answered = selectedChoice !== undefined;
  const isCorrect = selectedChoice === item.answer;

  return (
    <article className={`quiz-card ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}>
      <div className="quiz-head">
        <span className="quiz-number">Q{index + 1}</span>
        <h3>{item.q}</h3>
      </div>

      <div className="stack gap-sm">
        {item.choices.map((choice, choiceIndex) => {
          const selected = selectedChoice === choiceIndex;
          const correct = choiceIndex === item.answer;
          return (
            <button
              key={choice}
              className={`choice ${selected ? 'selected' : ''} ${answered && correct ? 'correct' : ''} ${answered && selected && !correct ? 'wrong' : ''}`}
              disabled={answered}
              onClick={() => onAnswer(index, choiceIndex)}
            >
              <span>{String.fromCharCode(65 + choiceIndex)}</span>
              <span>{choice}</span>
            </button>
          );
        })}
      </div>

      {answered ? <p className="explanation">{item.explanation}</p> : null}
    </article>
  );
}

export function QuizView({ chapter, answers, score, allAnswered, onAnswer, onBack, onNextChapter, isLast }) {
  return (
    <div className="stack gap-lg">
      <section className="hero-card compact">
        <div className="hero-tag">🧠 Quiz</div>
        <h2>{chapter.title}</h2>
        <p>{chapter.quiz.length} question{chapter.quiz.length > 1 ? 's' : ''} pour valider ce chapitre.</p>
      </section>

      {chapter.quiz.map((item, index) => (
        <QuizCard key={item.q} item={item} index={index} selectedChoice={answers[index]} onAnswer={onAnswer} />
      ))}

      {allAnswered ? (
        <section className="panel result-panel">
          <p className="eyebrow">Résultat</p>
          <h3>
            Score : {score}/{chapter.quiz.length}
          </h3>
          <p>
            {score === chapter.quiz.length
              ? 'Excellent, le chapitre est validé.'
              : 'Le contenu est disponible juste en dessous pour réviser et recommencer ensuite.'}
          </p>
          <div className="action-group">
            {!isLast ? (
              <button className="button primary" onClick={onNextChapter}>
                Chapitre suivant
              </button>
            ) : null}
            <button className="button ghost" onClick={onBack}>
              Retour au cours
            </button>
          </div>
        </section>
      ) : (
        <div className="footer-actions single">
          <button className="button ghost" onClick={onBack}>
            Retour au cours
          </button>
        </div>
      )}
    </div>
  );
}
