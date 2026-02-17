# GitHub Pages 手動設定手順

## 問題
GitHub Actionsのワークフローファイルをプッシュする権限がないため、自動デプロイが設定できません。

## 解決策: 手動でGitHub Pagesを設定

### 手順

1. **GitHubリポジトリにアクセス**
   - https://github.com/tailofyukki-cell/triple-tile-game

2. **Settings > Pagesに移動**
   - リポジトリページの上部メニューから「Settings」をクリック
   - 左サイドバーから「Pages」をクリック

3. **Source（ソース）を設定**
   - 「Build and deployment」セクションで「Source」を「GitHub Actions」に変更

4. **ワークフローファイルを手動で作成**
   - GitHubのWeb UIで`.github/workflows/deploy.yml`ファイルを作成
   - 以下の内容をコピー＆ペースト:

```yaml
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

      - name: Build
        run: NODE_ENV=production pnpm build
        env:
          NODE_ENV: production

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/public'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. **ワークフローをコミット**
   - 「Commit changes」をクリックしてファイルを保存

6. **デプロイの確認**
   - 「Actions」タブでワークフローの実行状況を確認
   - 完了後、`https://tailofyukki-cell.github.io/triple-tile-game/`でゲームにアクセス可能

## 公開URL
設定完了後、以下のURLでゲームが公開されます:
**https://tailofyukki-cell.github.io/triple-tile-game/**

## 注意事項
- リポジトリが**Public**である必要があります（現在はPublic設定済み）
- `vite.config.ts`に`base: '/triple-tile-game/'`が設定されています
