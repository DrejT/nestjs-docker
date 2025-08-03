# Stage 1: Build the NestJS application
FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and the lock file
# The lock file (pnpm-lock.yaml) is copied here to leverage Docker's build cache.
# It ensures that 'pnpm install' is only re-run if the dependencies change.
COPY package.json pnpm-lock.yaml ./

# Install pnpm and then the dependencies
RUN npm install -g pnpm
RUN pnpm install --prod=false

# Copy all source files
COPY . .

# Run the NestJS build command
RUN pnpm run build

# Stage 2: Create the final production image
FROM node:22-alpine AS production

# Set the working directory
WORKDIR /app

# Copy production dependencies from the build stage
COPY --from=build /app/package.json ./

# Install only production dependencies
RUN npm install -g pnpm
RUN pnpm install --prod --ignore-scripts

# Copy the built application code from the build stage
COPY --from=build /app/dist ./dist

# Expose the port the application runs on
EXPOSE 3000

# Set the environment variables
# This assumes you are using a .env file or similar for local development.
# In production, you should inject these as environment variables in ECS Task Definition.
# For example:
# ENV NODE_ENV=production
# ENV PORT=3000

# The command to run the application
CMD ["node", "dist/main"]
