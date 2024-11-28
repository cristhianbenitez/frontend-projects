import { Question } from '@/types/quiz';
import { Country } from '@/types/api';

type QuestionType = 'capital' | 'flag' | 'population';

interface QuestionGenerator {
  type: QuestionType;
  generate: (country: Country, countries: Country[]) => Question | null;
}

const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const questionGenerators: QuestionGenerator[] = [
  {
    type: 'capital',
    generate: (country: Country, countries: Country[]): Question | null => {
      if (!country.capital?.[0]) return null;

      const otherCapitals = countries
        .filter((c) => c.capital?.[0] && c.capital[0] !== country.capital[0])
        .map((c) => c.capital[0]);

      if (otherCapitals.length < 3) return null;

      const options = shuffleArray([...shuffleArray(otherCapitals).slice(0, 3), country.capital[0]]);

      return {
        id: `capital-${country.cca3}`,
        question: `What is the capital of ${country.name.common}?`,
        correctAnswer: country.capital[0],
        options
      };
    }
  },
  {
    type: 'flag',
    generate: (country: Country, countries: Country[]): Question | null => {
      const otherFlags = shuffleArray(countries.filter((c) => c.cca3 !== country.cca3)).slice(0, 3);

      if (otherFlags.length < 3) return null;
      return {
        id: `flag-${country.cca3}`,
        question: `Which country does this ${country.flag} flag belong to?`,
        correctAnswer: country.name.common,
        options: shuffleArray([...otherFlags.map((c) => c.name.common), country.name.common])
      };
    }
  },
  {
    type: 'population',
    generate: (country: Country): Question | null => {
      const formatter = new Intl.NumberFormat('en-US');
      const population = country.population;

      const variations = [Math.round(population * 0.5), Math.round(population * 1.5), Math.round(population * 2)].map(
        (v) => formatter.format(v)
      );

      return {
        id: `population-${country.cca3}`,
        question: `What is the approximate population of ${country.name.common}?`,
        correctAnswer: formatter.format(population),
        options: shuffleArray([...variations, formatter.format(population)])
      };
    }
  }
];

export function generateQuestions(countries: Country[], count: number = 10): Question[] {
  const questions: Question[] = [];
  const validCountries = countries.filter((country) => country.capital?.[0] && country.flags && country.population);

  if (validCountries.length < 4) {
    throw new Error('Not enough valid countries to generate questions');
  }

  while (questions.length < count) {
    const generator = getRandomElement(questionGenerators);
    const country = getRandomElement(validCountries);
    const question = generator.generate(country, validCountries);

    if (question) {
      questions.push(question);
    }
  }

  return questions;
}
