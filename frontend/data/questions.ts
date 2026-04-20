import type { Question } from "~~/types/game";

export const questions: Question[] = [
  {
    key: "lv-1",
    subject: "Latviešu valoda",
    prompt: "Viņš __ grāmatu katru dienu.",
    options: [
      { key: "A", text: "lasīt" },
      { key: "B", text: "lasa" },
      { key: "C", text: "lasīja" },
    ],
    correctOption: "B",
    rewardLabel: "Latviešu valodas grāmata",
    rewardImage: "/images/stages/books/lat_val.jpeg",
  },
  {
    key: "soc-1",
    subject: "Sociālās zinātnes",
    prompt: "Demokrātijā cilvēkiem ir __ izteikt savu viedokli.",
    options: [
      { key: "A", text: "aizliegts" },
      { key: "B", text: "tiesības" },
      { key: "C", text: "grūtības" },
    ],
    correctOption: "B",
    rewardLabel: "Sociālo zinātņu grāmata",
    rewardImage: "/images/stages/books/soc_zin.jpeg",
  },
  {
    key: "en-1",
    subject: "Angļu valoda",
    prompt: "If I __ more time, I would travel more.",
    options: [
      { key: "A", text: "have" },
      { key: "B", text: "had" },
      { key: "C", text: "will have" },
    ],
    correctOption: "B",
    rewardLabel: "Angļu valodas grāmata",
    rewardImage: "/images/stages/books/english.jpeg",
  },
  {
    key: "hist-1",
    subject: "Vēsture",
    prompt: "Latvija ieguva neatkarību __.",
    options: [
      { key: "A", text: "1918. gadā" },
      { key: "B", text: "1940. gadā" },
      { key: "C", text: "1991. gadā" },
    ],
    correctOption: "A",
    rewardLabel: "Vēstures grāmata",
    rewardImage: "/images/stages/books/history.jpeg",
  },
  {
    key: "math-1",
    subject: "Matemātika",
    prompt: "Atrisini vienādojumu: 2x² − 4x − 6 = 0",
    options: [
      { key: "A", text: "x = 3 vai x = -1" },
      { key: "B", text: "x = 2 vai x = -3" },
      { key: "C", text: "x = 1 vai x = -2" },
    ],
    correctOption: "A",
    rewardLabel: "Matemātikas grāmata",
    rewardImage: "/images/stages/books/math.jpeg",
  },
];

export const questionsMap = Object.fromEntries(
  questions.map((question) => [question.key, question]),
) as Record<string, Question>;
