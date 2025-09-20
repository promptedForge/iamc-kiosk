FROM node:20 as build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm i || true
COPY . .
RUN npm run build
FROM node:20
WORKDIR /srv
COPY --from=build /app/dist ./dist
EXPOSE 5173
CMD ["npx","vite","preview","--host","0.0.0.0","--port","5173"]
