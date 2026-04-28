#!/bin/bash
set -e

START=$(date +%s)
echo "=== ПАНЭМ Deploy === $(date)"

cd /var/www/panem

# Prisma CLI и Next.js build читают .env, но прод-конфиг лежит в .env.production.
# Подгружаем переменные в окружение, чтобы оба этапа их увидели.
if [ -f .env.production ]; then
  set -a
  # shellcheck disable=SC1091
  source .env.production
  set +a
fi

# Снимаем хэши до git pull — чтобы пропустить шаги, если соответствующее не менялось.
hash_lock_before=$(md5sum package-lock.json 2>/dev/null | cut -d' ' -f1)
hash_mig_before=$(find prisma/migrations -type f 2>/dev/null | sort | xargs md5sum 2>/dev/null | md5sum | cut -d' ' -f1)

echo "→ Git pull..."
git pull origin main

hash_lock_after=$(md5sum package-lock.json 2>/dev/null | cut -d' ' -f1)
hash_mig_after=$(find prisma/migrations -type f 2>/dev/null | sort | xargs md5sum 2>/dev/null | md5sum | cut -d' ' -f1)

# npm install — только если package-lock.json реально изменился.
# Раньше эти 30-60 сек прогорали на каждом «правка одного tsx»-деплое.
if [ "$hash_lock_before" != "$hash_lock_after" ] || [ ! -d node_modules ]; then
  echo "→ Install dependencies (lock changed)..."
  npm install --production=false
else
  echo "→ Skip install — lock unchanged"
fi

# Prisma migrate — только если есть новые/изменённые миграции.
if [ "$hash_mig_before" != "$hash_mig_after" ]; then
  echo "→ Prisma migrate (migrations changed)..."
  npx prisma migrate deploy
else
  echo "→ Skip prisma migrate — no new migrations"
fi

echo "→ Build..."
npm run build

echo "→ Restart PM2..."
pm2 restart panem || pm2 start npm --name "panem" -- start

END=$(date +%s)
echo "=== Deploy complete in $((END - START))s ==="
