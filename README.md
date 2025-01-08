# dtsb-learning-place
web application of learning place for datatech

## 開発者向け情報

### 開発環境

- ローカル: Docker Desktop + Dev Container

### ローカルでの開発

```bash
# ローカルでの開発
npm run dev
```

## TODO

### アルファ版

- AWSのインフラを構築してデプロイしてみる
  - ECR（Terraform化するときにライフサイクルを追加しておく）
  - IAM
  - ECS on Fargate
  - VPC (SGをいじる)
  - API Gateway
  - CloudFront
  - S3
  - CloudWatch Logs
- 動作確認
- ドメイン買う
- Terraformにimportしておく
  - Route53
  - ドメインをroute53に紐づける
  - ACM
  - VPC
  - [ ] SG
  - [ ] ECR (importする)
  - [ ] IAM
  - [ ] API Gateway
  - [ ] S3
  - [ ] ECS
  - [ ] CloudFront (これはマネジメントコンソールで作ってからimportする)
- CloudFrontのエイリアスレコードを追加する


### ベータ版 0.1.0

- Auth0を契約（Freeプラン）
- ユーザ認証機能を追加
- ユーザ情報を保存するDynamoDBを作成(IAMの権限も一緒に)
- クイズの正解情報をリモートのストレージに保存する機能
- クイズに正解したかどうかをクイズページに記載


### ベータ版 0.2.0

- OSS関係の情報を追加
  - Issueのテンプレート
- CI/CDのパイプラインを構築（GitHub Actions）
- 動作確認


### ベータ版 0.3.0

- クイズのコンテンツを追加する
- ヘッダーを追加する（SEO対策）


### ベータ版 0.4.0

- インフラ関係のチューニングをする


### ベータ版 0.5.0

- 試しに使ってもらってフィードバックをもらう


### v1.0.0（サービスとして提供開始）

- ある程度の量のコンテンツを貯める
- プライバシーポリシーを整理

- ユーザの学習状況を分析するダッシュボード機能


### v2.0.0（テキスト機能を追加）

- テキストのコンテンツを追加
- テキストのコンテンツの進捗を分析するダッシュボード機能
- 各種クリックイベントを追加
- アンケート機能追加
- ユーザの行動分析


### v3.0.0（有償版提供準備をスタート）

- 広告枠の募集
- 組織管理機能



