# Use an official Node.js runtime as a parent image
FROM node:14.21.3

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm 7.24.2
RUN npm install -g npm@7.24.2

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 9528

# Define environment variable
ENV NODE_ENV=development

# Run the application
CMD ["npm", "run", "dev"]