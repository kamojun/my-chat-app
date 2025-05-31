# Node.js公式イメージを使用
FROM node:24-slim

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存パッケージをインストール
RUN npm install

# ソースコードをコピー
COPY . .

# TypeScriptでビルド
RUN npm run build

# ポート番号（必要に応じて変更）
EXPOSE 3001

# サーバー起動
CMD ["npm", "start"]