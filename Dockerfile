FROM node:current-alpine3.17 as build
LABEL angular-core

# Add certificate and update CA certificates
COPY ZscalerRootCertificate-2048-SHA256.crt /usr/local/share/ca-certificates/
RUN apk update && apk add ca-certificates
RUN update-ca-certificates

# Install dependencies
RUN apk add --no-cache yarn curl
RUN yarn config set strict-ssl false --global

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Add the rest of the application files
ADD . .

# Debugging steps
RUN ls -la /app
RUN node -v && yarn -v
RUN cat package.json

# Run the build script
RUN npm run build:dev

# Define volume
VOLUME ["/app/data"]

# Expose the application port
EXPOSE 4200

# Command to run the application
CMD ["yarn", "start", "--host", "0.0.0.0", "--port", "4200"]

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine3.17
WORKDIR /app

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from the build stage
COPY --from=build /app/dist/ /dist/
