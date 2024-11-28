# Country Quiz

An interactive quiz application that tests users' knowledge about countries, capitals, and flags worldwide. This project was developed as an experiment in AI-assisted development, primarily using Claude 3.5 Sonnet.

## Project Overview

This project serves as a case study in AI-collaborative development:

- Core functionality and logic were developed through prompts to Claude 3.5 Sonnet
- My contributions focused mainly on styling and UI refinements
- The project is intentionally over-engineered to explore AI capabilities with modern web technologies

## Features Implemented ✅

- [x] Create a quiz interface with a clean, modern design
- [x] Generate 10 random questions about countries using REST Countries API
- [x] Include 4 multiple choice options for each question
- [x] Show immediate feedback with correct/incorrect indicators
- [x] Allow navigation between questions
- [x] Display congratulations page with final score after 10 questions
- [x] Include option to play again
- [x] Deploy solution and submit Repository URL and Demo URL

## Technologies Used

While the project could have been implemented with simpler tools, I intentionally used a modern stack to explore AI's capabilities with:

- Next.js 15
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Query
- Heroicons

*Note: This technology stack is admittedly overengineered for a quiz application. A simpler implementation using vanilla JavaScript or minimal libraries would be more appropriate for production use. The complex stack was chosen specifically for this AI development experiment.*

## Key Implementation Details

The quiz generator utilizes sophisticated algorithms to create varied questions:

- Dynamic question generation for capitals and flags
- Randomized answer options
- Intelligent answer shuffling
- Progress tracking system
- Immediate feedback mechanism

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

## Build and Deployment

The project is configured for optimal production deployment:

```bash
npm run build # Creates optimized production build
npm run start # Starts production server
```

## Live Demo

[View Live Demo](https://country-quiz.surge.sh)
