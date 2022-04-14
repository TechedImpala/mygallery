FROM node:14.14.0-alpine as builder
WORKDIR /gallery
COPY ./package.json ./
RUN npm i
COPY . .
CMD npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /gallery/build /usr/share/nginx/html