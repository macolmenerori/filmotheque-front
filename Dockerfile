FROM node:22-alpine
LABEL app="filmotheque-front" stack.binary="node" stack.version="22-alpine"

WORKDIR /usr/app

# Dockerfile config.env* means that if no config.env file is present, Dockerfile will be copied instead
COPY Dockerfile .env* ./
COPY src src
COPY public public
COPY package.json ./
COPY yarn.lock ./
COPY .eslintrc.js ./
COPY .npmrc ./
COPY .prettierrc ./
COPY eslint.config.mjs ./
COPY jest-global-setup.js ./
COPY jest.config.js ./
COPY jest.polyfills.js ./
COPY jest.setup.tsx ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY webpack.config.js ./

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]