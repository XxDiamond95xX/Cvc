function ModuleBlock({ module, isActive, onClick }) {
  return (
    <button className={`module-card ${isActive ? 'active' : ''}`} onClick={onClick}>
      <span className="module-icon">{module.icon}</span>
      <div>
        <strong>{module.title}</strong>
        <p>{module.subtitle}</p>
      </div>
    </button>
  );
}

function ChapterItem({ chapter, index, active, done, onClick }) {
  return (
    <button className={`chapter-item ${active ? 'active' : ''}`} onClick={onClick}>
      <span className={`chapter-badge ${done ? 'done' : ''}`}>{done ? '✓' : index + 1}</span>
      <span>{chapter.title}</span>
    </button>
  );
}

export function Sidebar({ modules, moduleIndex, chapterIndex, currentModule, completedChapters, onModuleClick, onChapterClick, open, onClose }) {
  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-head">
          <div>
            <p className="eyebrow">Parcours</p>
            <h2>Modules</h2>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Fermer le menu">
            ✕
          </button>
        </div>

        <div className="stack gap-md">
          {modules.map((module, index) => (
            <ModuleBlock key={module.id} module={module} isActive={index === moduleIndex} onClick={() => onModuleClick(index)} />
          ))}
        </div>

        <div className="sidebar-section">
          <p className="eyebrow">Chapitres</p>
          <div className="stack gap-sm">
            {currentModule.chapters.map((chapter, index) => (
              <ChapterItem
                key={chapter.id}
                chapter={chapter}
                index={index}
                active={chapterIndex === index}
                done={Boolean(completedChapters[`${currentModule.id}-${chapter.id}`])}
                onClick={() => onChapterClick(index)}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
