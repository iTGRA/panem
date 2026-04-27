# DEPLOY.md — Деплой и Git-процесс

## Окружения

| Окружение | URL | Ветка | Как деплоить |
|---|---|---|---|
| Разработка | http://localhost:3000 | любая | `npm run dev` |
| Продакшн | https://panem.swipeandev.ru | `main` | `./deploy.sh` на VDS |

---

## Git Workflow

```
main           — всегда рабочая продакшн версия
feature/*      — новые фичи
fix/*          — исправления
```

### Стандартный цикл

```bash
# 1. Создать ветку для задачи
git checkout -b feature/catalog-filters

# 2. Разработка + коммиты
git add .
git commit -m "feat: добавить фильтрацию каталога по сегменту"

# 3. Пуш
git push origin feature/catalog-filters

# 4. Merge в main (через PR или напрямую)
git checkout main
git merge feature/catalog-filters
git push origin main

# 5. Деплой на VDS
ssh user@server
cd /var/www/panem && ./deploy.sh
```

---

## Скрипт деплоя (`deploy.sh`)

```bash
#!/bin/bash
set -e

echo "=== ПАНЭМ Deploy === $(date)"

cd /var/www/panem

echo "→ Git pull..."
git pull origin main

echo "→ Install..."
npm install

echo "→ Prisma migrate..."
npx prisma migrate deploy

echo "→ Build..."
npm run build

echo "→ Restart..."
pm2 restart panem

echo "=== Done ==="
```

---

## PM2 команды

```bash
pm2 status            # статус всех процессов
pm2 logs panem        # логи в реальном времени
pm2 logs panem --lines 100  # последние 100 строк
pm2 restart panem     # перезапуск
pm2 stop panem        # остановка
pm2 monit             # мониторинг CPU/RAM
```

---

## Переменные окружения

### `.env.local` (локально, не в git)
```env
DATABASE_URL="postgresql://localhost:5432/panem_db_local"
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=local-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_REGION_DEFAULT=samara
```

### `.env.production` (на VDS, не в git)
```env
DATABASE_URL="postgresql://panem_user:PASSWORD@localhost:5432/panem_db"
NODE_ENV=production
NEXTAUTH_URL=https://panem.swipeandev.ru
NEXTAUTH_SECRET=сгенерировать_через_openssl_rand_-base64_32
NEXT_PUBLIC_SITE_URL=https://panem.swipeandev.ru
NEXT_PUBLIC_REGION_DEFAULT=samara
```

### `.env.example` (в git — шаблон)
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/panem_db"
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_REGION_DEFAULT=samara
```

---

## Типичные проблемы при деплое

**Build падает — ошибки TypeScript:**
```bash
# Посмотреть детали
npm run build 2>&1 | head -50
# Исправить ошибки локально, потом деплоить
```

**PM2 не перезапускается:**
```bash
pm2 kill
pm2 start npm --name "panem" -- start
pm2 save
```

**Prisma ошибка при деплое:**
```bash
# Проверить DATABASE_URL
cat /var/www/panem/.env.production | grep DATABASE
# Проверить доступность PostgreSQL
systemctl status postgresql
```

**502 Bad Gateway в Nginx:**
```bash
# Проверить PM2
pm2 status
pm2 logs panem --lines 30
# Проверить порт
curl http://localhost:3000
```
