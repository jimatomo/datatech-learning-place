FROM public.ecr.aws/docker/library/node:20-slim as builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# runner
FROM public.ecr.aws/docker/library/node:20-slim as runner

# Healthcheckのためにcurlをインストール
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV PORT=3000 NODE_ENV=production

WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/run.sh ./run.sh
# for Auth0
COPY --from=builder /app/.env.production.local ./.env.production.local

# 検索インデックス
COPY --from=builder /app/data ./data

# kuromoji辞書（形態素解析用）
COPY --from=builder /app/node_modules/kuromoji/dict ./node_modules/kuromoji/dict

# transformersモデルキャッシュ（存在する場合）
COPY --from=builder /app/.cache ./.cache

RUN ln -s /tmp/cache ./.next/cache && \
    # transformersキャッシュ用の書き込み可能なディレクトリを作成
    mkdir -p /tmp/cache/transformers && \
    # .cacheディレクトリの権限を設定（読み取り専用として使用、書き込みは/tmp/cache/transformersを使用）
    chown -R node:node /tmp/cache && \
    chown -R node:node ./.cache || true

# transformersキャッシュを書き込み可能なディレクトリに設定
ENV TRANSFORMERS_CACHE=/tmp/cache/transformers

USER node

CMD exec ./run.sh
