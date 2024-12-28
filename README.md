# GitStats

A React + TypeScript application for visualizing GitHub statistics.

## Prerequisites

- Node.js 20.x or Docker
- npm 10.x (if running without Docker)

## Development Setup

### Standard Setup (without Docker)

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your environment variables:
```bash
VITE_GITHUB_TOKEN=your_token_here
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Docker Setup

1. Create a `.env` file as described above

2. Build the Docker image:
```bash
docker build -t gitstats-dev .
```

3. Run the container:
```bash
docker run -it \
  --env-file .env \
  -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  gitstats-dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run storybook` - Start Storybook
- `npm run docs` - Generate documentation

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Apollo Client
- Chart.js
- Jest
- Storybook
