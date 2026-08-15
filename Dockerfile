FROM public.ecr.aws/docker/library/node:26-slim@sha256:715e55e4b84e4bb0ff48e49b398a848f08e55daed8eb6a0ea1839ae53bc57583 AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 PNPM_HOME=/pnpm
ENV PATH="${PNPM_HOME}:${PATH}"
RUN npm install --global pnpm@11.9.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# runner
FROM public.ecr.aws/docker/library/node:26-slim@sha256:715e55e4b84e4bb0ff48e49b398a848f08e55daed8eb6a0ea1839ae53bc57583 AS runner
ARG DEBIAN_FRONTEND=noninteractive

# Lambda Function URL originで同じimageを使えるようにする。
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:1.0.1 /lambda-adapter /opt/extensions/lambda-adapter

# Healthcheckのためにcurlをインストール
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV PORT=3000 HOSTNAME=0.0.0.0 NODE_ENV=production NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/run.sh ./run.sh
# for Auth0
COPY --from=builder /app/.env.production.local ./.env.production.local

# 検索インデックス
RUN mkdir -p ./data
COPY --from=builder /app/data/lexical-search-index.json ./data/lexical-search-index.json

# .next/cacheが既に存在する場合は削除してからシンボリックリンクを作成
RUN mkdir -p /tmp/cache && \
    (rm -rf ./.next/cache 2>/dev/null || true) && \
    ln -s /tmp/cache ./.next/cache && \
    chown -R node:node /tmp/cache
USER node

CMD ["./run.sh"]
