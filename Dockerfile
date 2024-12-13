FROM node:20-alpine AS dependencies-env
RUN npm i -g yarn
COPY . /app

FROM dependencies-env AS development-dependencies-env
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN yarn i --frozen-lockfile

FROM dependencies-env AS production-dependencies-env
COPY ./package.json yarn.lock /app/
WORKDIR /app
RUN yarn install --prod --frozen-lockfile

FROM dependencies-env AS build-env
COPY ./package.json yarn.lock /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN yarn build

FROM dependencies-env
COPY ./package.json yarn.lock /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["yarn", "start"]