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
  - SG
  - ECR (importする)
  - IAM
  - [ ] ECS
  - [ ] API Gateway
  - [ ] S3
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
  - DockerfileをArmに対応
  - ECS Serviceを変更


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
- 有料課金ユーザの機能追加
  - Personalプランのサブスク登録の画面をメンテ
  - 無料ユーザー機能の制限
  - 無料ユーザーにAdsenseを表示


### v4.0.0（組織管理機能）

- Businessプランのサブスク画面を追加
  - 組織は作成のタイミングでサブスクリプションの契約を必須とする
  - サブスクリプションを1つの単位として組織のオブジェクトに紐づけして、
    管理者のアカウントを組織オブジェクトに紐づける（1対多で複数人で管理できるようにする）
  - 初期の管理者はサブスクリプションの作成者
  - ダッシュボードを見れるユーザ数に応じて金額が階段状に増えていく
    （パーソナルプランからの乗り換えしてハックされないようにする目的）
- 組織管理機能
  - 組織ごとのユーザ管理機能
    - 参加を申請式にしている場合は承認機能（それ以外は自動で追加）
    - 組織管理外から外す
  - 組織ごとのユーザの学習状況を分析するダッシュボード機能
  - 組織の管理者ユーザの委任設定
- Accountページで組織に参加する機能を追加
  - 基本的には利用者の情報を組織に閲覧させることになるのでpush型にする
  - 複数の組織に紐づけられるようにする
  - Personalプランの場合は組織に見せる範囲の情報を設定できるようにする
    - 具体的にはどこの組織に所属しているのかの情報


