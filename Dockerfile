FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build

# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /app
EXPOSE 80
ENV VITE_API_BASE_URL=""
CMD ["nginx", "-g", "daemon off;"]
