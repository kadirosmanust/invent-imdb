FROM node:20-alpine AS dependencies-env
RUN npm i -g yarn
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM dependencies-env AS development-dependencies-env
COPY . .
RUN yarn install --frozen-lockfile

FROM dependencies-env AS production-dependencies-env
RUN yarn install --prod --frozen-lockfile

FROM dependencies-env AS build-env
COPY --from=development-dependencies-env /app /app
RUN yarn build

FROM node:20-alpine
WORKDIR /app
COPY --from=production-dependencies-env /app /app
COPY --from=build-env /app/build /app/build
CMD ["yarn", "start"]