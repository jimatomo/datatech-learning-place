# Datatech Learning Place

Web application of learning place for datatech

https://datatech-learning-place.net/

ここはデータエンジニアのための学習サイトです。

# コンテンツはOSSで育てていく

- Next.jsのコードをこのリポジトリで公開しています。
- 何かコンテンツに不備がありましたら、気軽にIssueもしくはフィードバックフォームでお知らせください。

※インフラ周りはTerraformで構築されており、プライベートリポジトリで管理しています。


## インフラ回りに関しての概要

- AWSを利用してデプロイしています。
- フロントエンドはCloudFront + API Gateway (HTTP) ( + CloudMap ) + ECS on Fargate + S3 で構成されています。
- バックエンドのデータベースは DynamoDB を利用しています。
- DynamoDB StreamsとData Firehoseを利用してS3 Tablesへ連携して学習履歴として蓄積しています。

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
eval "$(aws sts assume-role --role-session-name local \
  --role-arn arn:aws:iam::account_id:role/prod-dtlp-local-test-role \
  --query '[Credentials.AccessKeyId, Credentials.SecretAccessKey, Credentials.SessionToken]' \
  --output text | (
  read AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SECURITY_TOKEN
  export AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SECURITY_TOKEN
  declare -p AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SECURITY_TOKEN))"

aws configure list
```
