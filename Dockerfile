FROM public.ecr.aws/docker/library/node:26-slim@sha256:ffc78385a788964bb3cbab5e434ff79a10bdc25b8ae6db03fe5fe6cb14053c09 AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 PNPM_HOME=/pnpm
ENV PATH="${PNPM_HOME}:${PATH}"
RUN corepack enable && corepack prepare pnpm@11.9.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# runner
FROM public.ecr.aws/docker/library/node:26-slim@sha256:ffc78385a788964bb3cbab5e434ff79a10bdc25b8ae6db03fe5fe6cb14053c09 AS runner
ARG DEBIAN_FRONTEND=noninteractive

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
