FROM node:20.11.1-alpine
WORKDIR /usr/src/app
COPY package*.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm ci --only=production; \
        fi

COPY . .
ENV PORT 5000
EXPOSE $PORT
CMD ["node", "index.js"]