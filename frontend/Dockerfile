# ビルドステージ
FROM node:24-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 本番公開ステージ
FROM nginx:alpine

# ビルド成果物をNginxの公開ディレクトリへコピー
COPY --from=build /app/dist /usr/share/nginx/html

# 必要に応じてNginxの設定ファイルを上書き
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
