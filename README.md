# QuizardWeb

QuizardWeb is a React-based frontend for a quiz-generating application. It allows users to input text or links, processes the content, and generates quizzes dynamically. The frontend interacts with the Quizard API to retrieve quiz data and display it in an interactive format.

## Features

- Input text or multiple links for quiz generation.
- Retrieve quizzes with questions, options, and answers from the backend.
- Interactive quiz interface with hidden answers revealed on demand.
- Dynamic settings panel to customize quiz generation parameters.
- Mobile-friendly and user-friendly design.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-repo>/quizardweb.git
   ```

2. Navigate to the project directory:

```bash
cd quizardweb
```

3. Install the dependencies:
```bash
npm install
```

## Usage

1. Start the development server:
```bash
npm start
```

2. Open your web browser and navigate to:

```bash
http://localhost:3000
```

3. Interact with the app:
* Paste text or links (one per line) into the input area.
* Adjust quiz settings using the settings panel.
* Generate quizzes by clicking the "Generate Quiz" button.
* View the generated quiz below the input area.

### Live Demo
For a live demonstration of QuizardWeb, visit: QuizardWeb Live Demo

## Build

To build the app for production:
```bash
npm run build
```

The production build will be optimized and saved in the build folder.

## Deployment

QuizardWeb can be deployed to GitHub Pages, Vercel, Netlify, or any static site hosting service. For GitHub Pages, follow these steps:

1. Add the homepage property to your package.json:
```bash
"homepage": "https://<your-github>.github.io/quizardweb"
```

2. Run the deployment script:
```bash
npm run deploy
```

3. The app will be available at the specified homepage URL.

### Dependencies

React
Styled-components
Axios (for API requests)
Font Awesome (for icons)

#### Enjoy generating quizzes with QuizardWeb! 🚀
