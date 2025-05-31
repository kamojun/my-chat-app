# My-Chat-App

chat gpt風のuiを表示するフロントエンドとほぼ何もしないバックエンドです。

## 🚀 アプリの起動方法（Docker編）

このプロジェクトは、フロントエンド（React + Vite）とバックエンド（Express）をそれぞれ Docker コンテナで起動します。

### 🔧 前提

- Docker がインストールされていること
- フロントエンド・バックエンドともにビルド済みの Docker イメージが存在していること
  - 例：
    - `docker build -t my-chat-backend ./backend`
    - `docker build -t my-chat-frontend ./frontend`

---

### ▶️ 起動コマンド

```bash
# バックエンド（APIサーバー）
docker run -p 3001:3001 my-chat-backend

# フロントエンド（ReactアプリをNginxで配信）
docker run -p 3000:80 my-chat-frontend
