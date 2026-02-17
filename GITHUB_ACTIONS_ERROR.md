# GitHub Actions エラーレポート

## エラー内容

**ワークフロー**: Add GitHub Pages deployment workflow #4
**ステータス**: Failure
**実行時間**: 16秒
**コミット**: be1b8ba

### エラーメッセージ

```
build
Error: Multiple versions of pnpm specified:
- version 10 in the GitHub Action config with the key "version"
- version pnpm@4.1+sha512.c7538bc3ad7afa13af388fa6d808035a008e30ea9993f58c6663e2bc5ff21679aa834db094987129aa4d488b86df57f7b634981b2f827cdcacc698cc0cfb88af in the package.json with the key "packageManager"

Run one of these versions to avoid version mismatch errors like ERR_PNPM_BAD_PM_VERSION
```

## 原因分析

`package.json`の`packageManager`フィールドに指定されているpnpmのバージョン（`pnpm@4.1+sha512...`）と、GitHub Actionsワークフローで指定されているバージョン（`version: 10`）が一致していません。

### package.jsonの内容

```json
{
  "packageManager": "pnpm@10.4.1+sha512.c753b6c3ad7afa13af388fa6d808035a008e30ea9993f58c6663e2bc5ff21679aa834db094987129aa4d488b86df57f7b634981b2f827cdcacc698cc0cfb88af"
}
```

### ワークフローの設定

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v4
  with:
    version: 10  # ← ここが問題
```

## 解決策

ワークフローファイルの`version: 10`を削除して、`package.json`の`packageManager`フィールドから自動的にバージョンを取得するようにします。

### 修正後のワークフロー

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v4
  # with:
  #   version: 10  # ← この行を削除またはコメントアウト
```

## 次のステップ

1. `.github/workflows/deploy.yml`を編集
2. 29-32行目の`with: version: 10`を削除
3. コミット＆プッシュ
4. GitHub Actionsが自動的に再実行される
