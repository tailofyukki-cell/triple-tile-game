# GitHub Pages 最終設定手順（2分で完了）

## 現状
- ✅ Manus公開サイト: https://tripletile-nqe5cypz.manus.space （正常動作）
- ⏳ GitHub Pages: 設定待ち

## 必要な作業（ブラウザで2ステップ）

### ステップ1: GitHub Pagesを有効化

1. https://github.com/tailofyukki-cell/triple-tile-game/settings/pages にアクセス
2. **Source** を **「GitHub Actions」** に変更
3. 「Save」をクリック

### ステップ2: ワークフローファイルを作成

1. https://github.com/tailofyukki-cell/triple-tile-game にアクセス
2. キーボードで **「.」（ピリオド）** を押す → GitHub.devエディタが開く
3. 左サイドバーで「New File」アイコンをクリック
4. ファイル名に `.github/workflows/deploy.yml` を入力
5. 以下の内容を貼り付け:

\`\`\`yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      
      - run: pnpm install
      
      - run: pnpm build
        env:
          GITHUB_PAGES: "true"
      
      - uses: actions/configure-pages@v5
      
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/public'
      
      - uses: actions/deploy-pages@v4
        id: deployment
\`\`\`

6. 左上の「Source Control」アイコンをクリック
7. コミットメッセージに「Add GitHub Actions workflow」と入力
8. 「Commit & Push」をクリック

### 完了！

数分後、以下のURLでゲームが公開されます:
**https://tailofyukki-cell.github.io/triple-tile-game/**

## トラブルシューティング

### デプロイが失敗する場合

1. https://github.com/tailofyukki-cell/triple-tile-game/actions にアクセス
2. 失敗したワークフローをクリックしてエラーログを確認
3. エラー内容をManusに報告

### GitHub.devエディタが開かない場合

通常の方法でファイルを作成:
1. リポジトリページで「Add file」→「Create new file」をクリック
2. ファイル名とワークフロー内容を入力
3. 「Commit new file」をクリック
