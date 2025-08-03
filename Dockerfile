# Stage 1: Build the NestJS application from a Git repository
FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Install git inside the container to clone the repository
RUN apk add --no-cache git

# Clone your project from the Git repository
# IMPORTANT: Replace `YOUR_GIT_REPO_URL` with your actual repository URL.
# For private repos, you'll need to configure SSH keys or a token.
RUN git clone git@github.com:DrejT/nestjs-docker.git .

# Install pnpm and then the dependencies
RUN npm install -g pnpm
RUN pnpm install --prod=false

# Run the NestJS build command
RUN pnpm run build

# Stage 2: Create the final production image
FROM node:22-alpine AS production

# Set the working directory
WORKDIR /app

# Copy package.json and the lock file
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./

# Install only production dependencies
RUN npm install -g pnpm
RUN pnpm install --prod --ignore-scripts

# Copy the built application code from the build stage
COPY --from=build /app/dist ./dist

# Expose the port the application runs on
EXPOSE 3000

# Set the command to run the application
CMD ["node", "dist/main"]
