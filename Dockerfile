# Use official Node.js image for backend
FROM node:20-alpine as backend
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ .

# Use official Node.js image for frontend build
FROM node:20-alpine as frontend
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

# Use nginx to serve frontend and run backend
FROM nginx:alpine
COPY --from=frontend /app/dist /usr/share/nginx/html
COPY --from=backend /app /backend
COPY nginx.conf /etc/nginx/nginx.conf

# Start backend and nginx
CMD ["sh", "-c", "node /backend/server.js & nginx -g 'daemon off;'"]
