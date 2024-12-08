# Build Stage
FROM node:18-alpine as build

# Build App
WORKDIR /app
COPY package.json . 
RUN npm install
COPY . . 
RUN npm run build

# Serve with Nginx
FROM nginx:1.23-alpine

# Remove default Nginx static files (optional, not strictly necessary)
RUN rm -rf /usr/share/nginx/html/*

# Copy built app to Nginx static directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
