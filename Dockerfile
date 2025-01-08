FROM public.ecr.aws/docker/library/node:20.9.0-slim as builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# runner
FROM public.ecr.aws/docker/library/node:20.9.0-slim as runner

# aws-lambda-web-adapter 非同期処理がうまくいかないのでちょっと高くなるがECSにする
# COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter
# ENV AWS_LWA_ENABLE_COMPRESSION=true

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
RUN ln -s /tmp/cache ./.next/cache

USER node

CMD exec ./run.sh
