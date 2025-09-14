#!/bin/bash -e

[ ! -d '/tmp/cache' ] && mkdir -p /tmp/cache

# サーバーを起動
exec node server.js
