# 音声文字起こしツール

WhisperAPIを使用した音声ファイルの文字起こしツールです。

## 環境構築

このプロジェクトの実行には以下が必要です：

- Node.js 18.17.0以上
- OpenAI API Key

### インストール

```bash
# パッケージのインストール
pnpm install

# 環境変数ファイルの準備
cp .env.example .env.local
```

### 環境変数の設定

`.env.local`ファイルを開き、必要な環境変数を設定してください：

```ini
OPENAI_API_KEY=your_api_key_here  # OpenAIのAPIキーに置き換えてください
```

## 開発サーバーの起動

```bash
pnpm dev
```

[http://localhost:4231](http://localhost:4231)をブラウザで開いてアプリケーションにアクセスできます。

## 機能

- 音声ファイルのドラッグ&ドロップによるアップロード
- 対応フォーマット: MP3, WAV, M4A, OGG
- ファイルサイズ制限: 25MB
- WhisperAPIを使用した高精度な文字起こし
- 日本語・英語対応

## 技術スタック

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全な開発
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング
- [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text) - 音声認識
- [React Dropzone](https://react-dropzone.js.org/) - ファイルアップロード

## 開発について

`src/app/page.tsx`を編集することでメインページの更新が可能です。ファイルの編集内容はホットリロードで即時反映されます。

## ライセンス

[MIT License](LICENSE)

## コマンド一覧

```bash
# 開発サーバーの起動
pnpm dev

# プロダクションビルド
pnpm build

# プロダクションサーバーの起動
pnpm start

# リントの実行
pnpm lint
```
