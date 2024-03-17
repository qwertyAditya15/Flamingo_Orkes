FROM node:20.9.0-alpine

ENV PORT {PORT}
ENV NODE_ENV {NODE_ENV}
ENV DB_URI {DB_URI}

ENV SECRET {SECRET}
ENV COOKIE_NAME {COOKIE_NAME}

ENV DOMAIN {DOMAIN}
ENV WHITELISTED_DOMAINS {WHITELISTED_DOMAINS}

WORKDIR /usr/apps/codeploy-api

COPY yarn.lock .
COPY package.json .

RUN yarn install --production --frozen-lockfile
RUN yarn add -D @swc/cli @swc/core

COPY . .

RUN yarn build

EXPOSE 5000-12000

CMD ["yarn", "start"]
