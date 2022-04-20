FROM node:14.14.0-alpine as builder
WORKDIR /gallery
COPY ./package.json ./
ARG REACT_APP_CLIENT_ID
ENV REACT_APP_CLIENT_ID $REACT_APP_CLIENT_ID
RUN npm i
COPY . .
CMD npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /gallery/build /usr/share/nginx/html