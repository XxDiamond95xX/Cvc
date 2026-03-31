import { Header } from './components/Header';
import { LearnView } from './components/LearnView';
import { QuizView } from './components/QuizView';
import { Sidebar } from './components/Sidebar';
import { useTrainingState } from './hooks/useTrainingState';

export default function App() {
  const training = useTrainingState();

  const isFirst = training.moduleIndex === 0 && training.chapterIndex === 0;
  const isLast =
    training.moduleIndex === training.modules.length - 1 &&
    training.chapterIndex === training.currentModule.chapters.length - 1;

  return (
    <div className="app-shell">
      <Sidebar
        modules={training.modules}
        moduleIndex={training.moduleIndex}
        chapterIndex={training.chapterIndex}
        currentModule={training.currentModule}
        completedChapters={training.completedChapters}
        onModuleClick={training.goToModule}
        onChapterClick={training.goToChapter}
        open={training.menuOpen}
        onClose={() => training.setMenuOpen(false)}
      />

      <div className="main-shell">
        <Header
          moduleTitle={training.currentModule.title}
          progressPercent={training.progressPercent}
          completedCount={Object.keys(training.completedChapters).length}
          totalChapterCount={training.totalChapterCount}
          onMenuToggle={() => training.setMenuOpen(true)}
        />

        <main className="page-content">
          {training.view === 'learn' ? (
            <LearnView
              module={training.currentModule}
              chapter={training.currentChapter}
              onGoQuiz={() => training.setView('quiz')}
              onNext={training.nextChapter}
              onPrevious={training.previousChapter}
              isFirst={isFirst}
              isLast={isLast}
            />
          ) : (
            <QuizView
              chapter={training.currentChapter}
              answers={training.currentAnswers}
              score={training.score}
              allAnswered={training.allAnswered}
              onAnswer={training.answerQuestion}
              onBack={() => training.setView('learn')}
              onNextChapter={training.nextChapter}
              isLast={isLast}
            />
          )}
        </main>
      </div>
    </div>
  );
}
