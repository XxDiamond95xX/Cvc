import { useMemo, useState } from 'react';
import { modules, totalChapterCount } from '../data/modules';

export function useTrainingState() {
  const [moduleIndex, setModuleIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [view, setView] = useState('learn');
  const [answersByChapter, setAnswersByChapter] = useState({});
  const [completedChapters, setCompletedChapters] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const currentModule = modules[moduleIndex];
  const currentChapter = currentModule.chapters[chapterIndex];
  const chapterKey = `${currentModule.id}-${currentChapter.id}`;
  const currentAnswers = answersByChapter[chapterKey] || {};

  const progressPercent = Math.round((Object.keys(completedChapters).length / totalChapterCount) * 100);

  const score = useMemo(
    () => currentChapter.quiz.filter((item, index) => currentAnswers[index] === item.answer).length,
    [currentAnswers, currentChapter.quiz],
  );

  const allAnswered = Object.keys(currentAnswers).length === currentChapter.quiz.length;

  const goToModule = (index) => {
    setModuleIndex(index);
    setChapterIndex(0);
    setView('learn');
    setMenuOpen(false);
  };

  const goToChapter = (index) => {
    setChapterIndex(index);
    setView('learn');
    setMenuOpen(false);
  };

  const answerQuestion = (questionIndex, choiceIndex) => {
    if (currentAnswers[questionIndex] !== undefined) return;

    const nextAnswers = {
      ...currentAnswers,
      [questionIndex]: choiceIndex,
    };

    setAnswersByChapter((prev) => ({
      ...prev,
      [chapterKey]: nextAnswers,
    }));

    if (choiceIndex === currentChapter.quiz[questionIndex].answer) {
      setCompletedChapters((prev) => ({ ...prev, [chapterKey]: true }));
    }
  };

  const nextChapter = () => {
    if (chapterIndex < currentModule.chapters.length - 1) {
      setChapterIndex((prev) => prev + 1);
      setView('learn');
      return;
    }

    if (moduleIndex < modules.length - 1) {
      setModuleIndex((prev) => prev + 1);
      setChapterIndex(0);
      setView('learn');
    }
  };

  const previousChapter = () => {
    if (chapterIndex > 0) {
      setChapterIndex((prev) => prev - 1);
      setView('learn');
      return;
    }

    if (moduleIndex > 0) {
      const previousModuleIndex = moduleIndex - 1;
      setModuleIndex(previousModuleIndex);
      setChapterIndex(modules[previousModuleIndex].chapters.length - 1);
      setView('learn');
    }
  };

  return {
    modules,
    totalChapterCount,
    moduleIndex,
    chapterIndex,
    view,
    currentModule,
    currentChapter,
    chapterKey,
    currentAnswers,
    completedChapters,
    progressPercent,
    score,
    allAnswered,
    menuOpen,
    setView,
    setMenuOpen,
    goToModule,
    goToChapter,
    answerQuestion,
    nextChapter,
    previousChapter,
  };
}
