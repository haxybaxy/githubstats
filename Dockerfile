# Use Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code and .env file
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the development server with host flag to allow external connections
CMD ["npm", "run", "dev", "--", "--host"]
