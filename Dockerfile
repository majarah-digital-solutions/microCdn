FROM node:18.11.0 as base

FROM base as development

WORKDIR /microCdn
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 15000
CMD ["yarn","dev"]

FROM base as production

WORKDIR /microCdn
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 80
CMD ["yarn","start"]