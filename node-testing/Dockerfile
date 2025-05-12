FROM node:22-alpine
WORKDIR /usr/src/app

# Install dependencies locally (not globally)
RUN npm install express cors body-parser
RUN npm install -g nodemon

# Copy application files
COPY . .

EXPOSE 3001
CMD ["nodemon", "src/index.js"]