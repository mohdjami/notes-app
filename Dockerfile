# Use an official Node runtime as the base image
# Adjust this to match your machine's architecture
FROM node:lts

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies inside the Docker container
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Prisma generate
RUN npx prisma generate

# Transpile TypeScript into JavaScript
RUN npm run build

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8000

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start" ]