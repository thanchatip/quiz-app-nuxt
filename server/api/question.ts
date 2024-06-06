import { type Question, questions } from '../../../data/question.ts';

export default defineEventHandler(() => {
  const shuffled = questions.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 20).map((question: Question) => ({
    ...question,
    choices: question.choices.sort(() => 0.5 - Math.random()),
  }));
});
