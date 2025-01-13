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
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/run.sh ./run.sh
# for Auth0
COPY --from=builder /app/.env.production.local ./.env.production.local
RUN ln -s /tmp/cache ./.next/cache

USER node

CMD exec ./run.sh
