# <img src="./public/favicon.svg" alt="GitStats Logo" width="30" height="30" style="vertical-align: middle; margin-left: 5px;"> GitHub Stats <img src="./public/favicon.svg" alt="GitStats Logo" width="30" height="30" style="vertical-align: middle; margin-left: 5px;">
![Screenshot](./public/screenshot.jpeg "Screenshot")

A modern React application for visualizing and comparing GitHub profiles. GitStats provides beautiful, interactive visualizations of user contributions, repository statistics, and coding patterns. Compare developers, analyze contribution trends, and get insights into coding habits through an intuitive interface.

## Features

- 📊 Real-time GitHub statistics visualization
- 🔄 Profile comparison capabilities
- 📈 Interactive contribution graphs
- 📱 Responsive design with dark mode support
- ⚡ Fast and efficient data loading
- 🎨 Beautiful UI with smooth animations

## Prerequisites

- Node.js 20.x or Docker
- npm 10.x (if running without Docker)
- GitHub Personal Access Token (for API access)

## Development Setup

### Standard Setup (without Docker)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gitstats.git
cd gitstats
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your GitHub token:
```bash
VITE_GITHUB_TOKEN=your_token_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Docker Setup

1. Create a `.env` file as described above

2. Build and run with Docker:
```bash
# Build the image
docker build -t gitstats-dev .

# Run the container
docker run -it \
  --env-file .env \
  -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  gitstats-dev
```

## Testing

### Running Tests

1. Run the entire test suite:
```bash
npm run test
```

2. Run tests in watch mode (for development):
```bash
npm run test:watch
```

3. Generate coverage report:
```bash
npm run test:coverage
```

### Running Storybook

Storybook provides a sandbox environment for developing and testing components in isolation:

```bash
npm run storybook
```

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

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Data Fetching**: Apollo Client (GraphQL)
- **Visualization**: Chart.js
- **Testing**: Jest + React Testing Library
- **Documentation**: Storybook + TypeDoc
- **Animation**: Framer Motion

## Future Improvements

1. **Features**
   - Add repository comparison functionality
   - Implement organization statistics
   - Add more detailed commit analysis
   - Export statistics as PDF/PNG
   - Add custom date range selection

2. **Technical**
   - Implement data caching for faster loads
   - Add E2E tests with Cypress
   - Improve error handling and retry logic
   - Add PWA support
   - Implement real-time updates

3. **UI/UX**
   - Add more visualization options
   - Implement customizable themes
   - Add keyboard shortcuts
   - Improve mobile experience
   - Add more accessibility features

4. **Performance**
   - Implement code splitting
   - Add service worker for offline support
   - Optimize bundle size
   - Add request batching
   - Implement virtual scrolling for large datasets

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
