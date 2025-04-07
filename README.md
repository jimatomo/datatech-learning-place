# dtsb-learning-place
web application of learning place for datatech

https://datatech-learning-place.net/

ここはデータエンジニアのための学び舎です。
今後以下のコンテンツを追加予定です。

- 一日一問出題されるクイズ（完全無料）
- データアプリケーションを構築しながら学んでいくテキスト（完全無料）
- 運用費の足しにするのための広告・アフェリエイト（無料ユーザに表示）
- 学習の進捗を分析するダッシュボード機能（有償予定）
- 企業・チームで利用しやすくする組織管理機能（有償予定）
- スポンサー紹介コンテンツ（スポンサーになってもいいよという場合はフッターのお問い合わせページよりお願いします）


# コンテンツはOSSで育てていく

- Next.jsのコードをこのリポジトリで公開しています。
- 何かコンテンツに不備がありましたら、気軽にIssueを作成してください。
- 実際のコンテンツはcontents/配下に配置していますので、Pull Requestを送る場合はそちらをご覧いただければと思います。
- ページのレイアウトなどはapp/配下やcomponents/配下に配置しています。

※インフラ周りはTerraformで構築されており、プライベートリポジトリで管理しています。


## インフラ回りに関しての概要

- AWSを利用してデプロイしています。
- フロントエンドはCloudFront + API Gateway (HTTP) ( + CloudMap ) + ECS on Fargate + S3 で構成されています。
- バックエンドのデータベースは DynamoDB を利用しています。
- 将来的にDynamoDBStreamを利用して学習データをS3に送り込んで学習状況の分析ダッシュボードも提供しようと構想しています（まだないです。）


## 開発者向け情報

### 開発環境

- ローカル: Docker Desktop + Dev Container
- AWSの権限（Identity Center）を利用できるようにすると、バックエンドのデータの取り扱いができるようになります。
- 認証するためにはAuth0関係の環境変数が書かれている.env.localファイルが必要です。


### ローカルでの開発

```bash
# ローカルでの開発
npm run dev

# AWS SSO Config
aws configure sso

# SSO
aws sso login

# local role
aws sts assume-role --role-arn arn:aws:iam::179217610303:role/prod-dtlp-local-test-role --role-session-name local
```
