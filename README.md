# Vite Handlebars SCSS Template Builder

Современный шаблон для сборки HTML-проектов с использованием:

- 🛠 Vite
- 🧾 Handlebars (через Vituum)
- 🎨 SCSS
- 🖼 Оптимизация изображений + автогенерация WebP
- 🧩 SVG-спрайтинг
- 🧹 Prettier, ESLint, Stylelint

---

## 📦 Установка

```bash
git clone https://github.com/ndserg/vite-handlebars
cd vite-handlebars
npm install
```

---

## 🚀 Скрипты

| Команда             | Описание                                     |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Запуск dev-сервера + конвертация WebP        |
| `npm run build`     | Продакшн сборка + WebP                       |
| `npm run build:dev` | Сборка без минификации HTML (для отладки)    |
| `npm run webp`      | Отдельно запускает `convert-to-webp.js`      |
| `npm run preview`   | Локальный просмотр продакшн-сборки           |
| `npm run eslint`    | Проверка JS-файлов                           |
| `npm run prettify`  | Приведение HTML/CSS в порядок через Prettier |
| `npm run fixScss`   | Исправление ошибок CSS через Stylelint       |

---

## 📁 Структура проекта

```
src/
├── assets/
│   ├── images/
│   │   ├── sprite-icons/         # SVG для спрайта
│   │   └── other-images/         # Изображения .jpg / .png (WebP создаются автоматически)
│   └── styles/
│       └── main.scss             # Основной SCSS
├── pages/
│   └── index.hbs                 # Шаблон страницы
├── layouts/
│   └── default.hbs               # Лэйауты для Vituum
└── partials/
    └── header.hbs, footer.hbs    # Компоненты
```

---

## 🖼 WebP-конвертация

Скрипт `convert-to-webp.js` рекурсивно проходит по `src/assets/images` и сохраняет `.webp`-версии в `public/images`, сохраняя структуру папок.

Пример:

```bash
src/assets/images/blog/photo.jpg
↓
public/images/blog/photo.webp
```

---

## 🧩 SVG-спрайт

Все SVG из `src/assets/images/sprite-icons/*.svg` объединяются в один файл спрайта:

```bash
src/assets/images/icons/sprite.svg
```

SVG обрабатываются через `svgo` и удаляются `fill`-атрибуты по умолчанию.

---

## 📚 Использование шаблонов

Шаблоны `.hbs` автоматически компилируются в `.html`:

```handlebars
<!-- src/pages/index.hbs -->
{{> partials/header }}
<h1>Hello World</h1>
{{> partials/footer }}
```

---

## ✨ Благодарности

- 🤖 [ChatGPT](chat.openai.com) && [Copilot](copilot.microsoft.com) — помощь с конфигурацией, оптимизацией и автоматизацией.

Проект вдохновлён практикой эффективной сборки HTML-шаблонов в современных проектах. Подходит как для лендингов, так и для небольших сайтов с оптимизацией "из коробки".

---

## 🪪 Автор

[Denis Natalevich](https://github.com/ndserg) · MIT License
