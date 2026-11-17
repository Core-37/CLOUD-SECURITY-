#!/usr/bin/env bash
set -euo pipefail

# Скрипт инициализации отдельного Git-репозитория для курса Cloud-Security-Course
# Использование: ./push_to_github.sh https://github.com/USERNAME/Cloud-Security-Course.git

if [ "${1:-}" = "" ]; then
  echo "Использование: $0 <URL_НОВОГО_GITHUB_РЕПОЗИТОРИЯ>"
  echo "Пример:        $0 https://github.com/Core-37/Cloud-Security-Course.git"
  exit 1
fi

REMOTE_URL="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -d ".git" ]; then
  echo "[1/5] Инициализация нового автономного Git-репозитория..."
  git init -b main
else
  echo "[1/5] Локальный Git-репозиторий уже инициализирован."
fi

echo "[2/5] Проверка .gitignore (ключи .pem/.env/.tfstate защищены)..."
git add .

if git diff --cached --quiet; then
  echo "[3/5] Нет новых изменений для коммита."
else
  echo "[3/5] Создание коммита..."
  git commit -m "feat: add full zero-to-hero Cloud Security Course & interactive academy"
fi

echo "[4/5] Привязка удалённого репозитория origin -> $REMOTE_URL"
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

echo "[5/5] Отправка ветки main в GitHub..."
git push -u origin main
echo "✅ Готово! Курс успешно загружен в отдельный репозиторий: $REMOTE_URL"
