# Учебный проект "Mesto"

# Демо
https://dimukko.github.io/mesto-gallery/

На данный момент сиё творение умеет:
- Загружать информацию о пользователе с сервера;
- Редактировать информацию о пользователе(имя и о себе) и отправлять данные на сервер;
- Загружать карточки с сервера;
- Добавлять карточки и отправлять данные на сервер;
- Удалять карточки с сервера;
- Ставить и снимать лайки;
- Менять фото профиля;
- Поля ввода данных проходят валидацию посредством JS;
- Добавил спиннер при загрузке, но сейчас без 6к карточек уже и не видно его.

## Установка

Необходим установленный Node.js

1. Клонируйте проект:

```
git clone https://github.com/dimukko/mesto-gallery.git
```

2. Установите зависимости:

```
npm install
```

## Использование и сборка

1. Локальная разработка с использованием веб-сервера:

```
npm run dev
```

2. Сборка продакшен версии:

```
npm run build
```

3. Отправка на сервис GitHub Pages:

```
npm run deploy
```

## Результат выполнения 12го спринта:
- В Git есть ветка master и develop, в которой разрабатывался функционал.
- Установлен вебпак для оптимизации картинкок и шрифтов.
- CSS-код минимизирован, проставлены вендорные префиксы.
- JS разбит на модули и переведён бабелем из ES6 в ES5.
