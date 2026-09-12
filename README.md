# TakeChat

iPad向け旅行チャットのスターター実装。

## 重要
このリポジトリはUI・認証・PWA/通知導線までを含むベースです。
`/api/profile` と `/api/push` はデモ用エンドポイントなので、本番ではPostgreSQL/PrismaとFirebase Admin SDKを接続してください。
パスワードはFirebase Authenticationに任せ、平文を保存・閲覧しないでください。

## 起動
1. Node.js 20+ / pnpmを用意
2. `pnpm install`
3. `.env.example` を `.env.local` にコピー
4. Firebase ConsoleでAuthentication > Email/Passwordを有効化
5. Firebase Webアプリの値を設定
6. `pnpm dev`

## PWA Push
Firebase Cloud MessagingのWeb Push用VAPIDキーを `NEXT_PUBLIC_FIREBASE_VAPID_KEY` に設定。
`public/sw.js` のFirebase設定も同じプロジェクトに合わせてください。
本番はHTTPS必須。

## Render
Build Command: `pnpm install --frozen-lockfile && pnpm build`
Start Command: `pnpm start`
Node 20+推奨。

## 次の実装
- Prisma/PostgreSQL
- Firebase Admin SDKによるIDトークン検証
- Socket.IOリアルタイム通信
- FCMサーバー送信
- Firebase Storageへの画像アップロード
- 友達/グループ/既読/未読
- Rate limit / CSRF / セキュリティヘッダ
- 管理者権限と監査ログ
