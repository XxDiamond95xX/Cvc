import { DiagramCard } from './DiagramCard';

function Section({ section }) {
  return (
    <section className="content-block">
      <h3>{section.title}</h3>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {section.formulas?.map((formula) => (
        <div key={formula} className="formula-box">
          {formula}
        </div>
      ))}

      {section.bullets?.length ? (
        <ul className="bullet-list">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}

      {section.steps?.length ? (
        <ol className="ordered-list">
          {section.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

export function LearnView({ module, chapter, onGoQuiz, onNext, onPrevious, isFirst, isLast }) {
  return (
    <div className="stack gap-lg">
      <section className="hero-card" style={{ '--accent': module.color }}>
        <div className="hero-tag">{module.icon} {module.title}</div>
        <h2>{chapter.title}</h2>
        <p>{chapter.summary}</p>
      </section>

      <DiagramCard diagram={chapter.diagram} color={module.color} />

      <section className="panel stack gap-md">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Cours</p>
            <h3>Contenu théorique</h3>
          </div>
        </div>

        {chapter.sections.map((section) => (
          <Section key={section.title} section={section} />
        ))}
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Synthèse</p>
            <h3>Points clés</h3>
          </div>
        </div>

        <div className="keypoints-grid">
          {chapter.keyPoints.map((point) => (
            <article key={point} className="keypoint-card">
              <span>▸</span>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="footer-actions">
        <button className="button ghost" onClick={onPrevious} disabled={isFirst}>
          ← Précédent
        </button>
        <div className="action-group">
          {!isLast ? (
            <button className="button ghost" onClick={onNext}>
              Suivant →
            </button>
          ) : null}
          <button className="button primary" onClick={onGoQuiz}>
            Passer le quiz
          </button>
        </div>
      </div>
    </div>
  );
}
