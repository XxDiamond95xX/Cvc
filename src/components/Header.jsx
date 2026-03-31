export function Header({ moduleTitle, progressPercent, completedCount, totalChapterCount, onMenuToggle }) {
  return (
    <header className="topbar">
      <div className="brand-row">
        <button className="menu-button" onClick={onMenuToggle} aria-label="Ouvrir le menu">
          ☰
        </button>
        <div>
          <p className="eyebrow">FORMATION TECHNICIEN</p>
          <h1>CVC / CRAC / CRAH</h1>
        </div>
      </div>

      <div className="progress-shell" aria-label="progression globale">
        <div className="progress-labels">
          <span>{moduleTitle}</span>
          <span>
            {completedCount}/{totalChapterCount} chapitres
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
    </header>
  );
}
