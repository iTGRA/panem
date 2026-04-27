#!/bin/bash
set -e

echo "=== ПАНЭМ Deploy ==="
echo "$(date)"

cd /var/www/panem

# Prisma CLI и Next.js build читают .env, но прод-конфиг лежит в .env.production.
# Подгружаем переменные в окружение, чтобы оба этапа их увидели.
if [ -f .env.production ]; then
  set -a
  # shellcheck disable=SC1091
  source .env.production
  set +a
fi

echo "→ Git pull..."
git pull origin main

echo "→ Install dependencies..."
npm install --production=false

echo "→ Prisma migrate..."
npx prisma migrate deploy

echo "→ Build..."
npm run build

echo "→ Restart PM2..."
pm2 restart panem || pm2 start npm --name "panem" -- start

echo "=== Deploy complete ==="
