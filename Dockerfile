FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build

# этап production (production-stage)
FROM nginx:1.21 as production-stage
COPY --from=build-stage /app/dist /app
COPY deploy/nginx.conf /etc/nginx/nginx.conf
ENV VITE_API_BASE_URL=""
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf" && nginx -g 'daemon off;'
