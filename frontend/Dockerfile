# frontend/Dockerfile

FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

ARG REACT_APP_BACKEND_URL=/api
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}


ARG REACT_APP_REVIEW_API_KEY
ENV REACT_APP_REVIEW_API_KEY=${REACT_APP_REVIEW_API_KEY}

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
