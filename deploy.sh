#!/bin/bash

# Скрипт для пуша на GitHub Pages

echo "🚀 Подготовка к пушу на GitHub Pages..."
echo ""

# Проверяем, есть ли удаленный репозиторий
if git remote -v | grep -q origin; then
    echo "✅ Удаленный репозиторий найден"
else
    echo "❌ Удаленный репозиторий не найден"
    echo ""
    echo "Добавьте ваш репозиторий командой:"
    echo "git remote add origin https://github.com/ВАШ_НИК/ВАШ_РЕПОЗИТОРИЙ.git"
    echo ""
    echo "Или используйте SSH:"
    echo "git remote add origin git@github.com:ВАШ_НИК/ВАШ_РЕПОЗИТОРИЙ.git"
    echo ""
    exit 1
fi

# Пуш в main ветку
echo "📦 Пуш в ветку main..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Успешно!"
    echo ""
    echo "📍 Теперь включите GitHub Pages:"
    echo "   1. Зайдите в репозиторий на GitHub"
    echo "   2. Settings → Pages"
    echo "   3. Source: Deploy from branch"
    echo "   4. Branch: main"
    echo "   5. Folder: / (root)"
    echo "   6. Save"
    echo ""
    echo "🌐 Сайт будет доступен по адресу:"
    echo "   https://ВАШ_НИК.github.io/ВАШ_РЕПОЗИТОРИЙ/"
    echo ""
else
    echo ""
    echo "❌ Ошибка при пуше"
    exit 1
fi
