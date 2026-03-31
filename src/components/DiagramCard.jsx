export function DiagramCard({ diagram, color }) {
  return (
    <section className="panel diagram-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Schéma de principe</p>
          <h3>{diagram.title}</h3>
        </div>
      </div>

      <div className="diagram-grid">
        <div className="diagram-flow">
          {diagram.steps.map((step, index) => (
            <div key={step} className="flow-step" style={{ '--accent': color }}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>

        <div className="stats-grid">
          {diagram.stats.map((stat) => (
            <article key={stat} className="stat-box">
              <span>•</span>
              <p>{stat}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
