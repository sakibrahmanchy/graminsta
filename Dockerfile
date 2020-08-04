FROM node:14-alpine
RUN mkdir /app
WORKDIR /app
ADD . /app

EXPOSE 8080
EXPOSE 3306

RUN rm -f .npmrc

CMD [ "npm run start:prod" ]
ENTRYPOINT [ "sh", "-c" ]
