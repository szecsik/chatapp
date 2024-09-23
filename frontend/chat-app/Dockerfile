# Step 1: Use a Node.js base image to build the React app
FROM node:16-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Use Nginx to serve the built app
FROM nginx:alpine

# Copy the built React app from the previous stage to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
