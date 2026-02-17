# GitHub Pages 自動設定手順

## 問題
GitHub APIの権限制限により、ワークフローファイルを自動でプッシュできません。

## 解決策: ブラウザで1回だけ手動設定

### 手順（所要時間: 2分）

1. **GitHubリポジトリにアクセス**
   - https://github.com/tailofyukki-cell/triple-tile-game

2. **Settings > Pagesに移動**
   - リポジトリページの上部メニューから「Settings」をクリック
   - 左サイドバーから「Pages」をクリック

3. **Source（ソース）を「GitHub Actions」に変更**
   - 「Build and deployment」セクションで「Source」を「GitHub Actions」に変更
   - これで自動デプロイが有効になります

4. **ワークフローファイルを作成**
   - リポジトリのトップページに戻る
   - 「Add file」→「Create new file」をクリック
   - ファイル名に `.github/workflows/deploy.yml` を入力
   - 以下の内容をコピー＆ペースト:

\`\`\`yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install

      - name: Build for GitHub Pages
        run: pnpm build
        env:
          NODE_ENV: production
          GITHUB_PAGES: "true"

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/public'

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
\`\`\`

5. **コミット**
   - 「Commit changes」をクリック
   - コミットメッセージはデフォルトのままでOK

6. **デプロイの確認**
   - 「Actions」タブでワークフローの実行状況を確認
   - 完了後、以下のURLでゲームにアクセス可能:
   - **https://tailofyukki-cell.github.io/triple-tile-game/**

## これで完了！

今後は`main`ブランチにプッシュするたびに、自動的にGitHub Pagesにデプロイされます。

## 公開URL

- **Manus**: https://tripletile-nqe5cypz.manus.space
- **GitHub Pages**: https://tailofyukki-cell.github.io/triple-tile-game/

両方のURLで同じゲームが動作します。
