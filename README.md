### Веб-приложение:
Онлайн арт-галерея (наподобие Pinterest, Tumblr и др.)

### Стек-технологии:

    EJS;
    Node.js; 
    Express.js;
    OAuth 2.0
    PostgreSQL;

### Описание веб-приложения: 
Приложение является арт-пространством для творческих людей, где они могут просматривать изображения.

Функционал будет включать:
    1. Просмотр главной страницы;
    2. Возможность выбрать предпочитаемую категорию изображений, которая будет отображаться первой;
    3. Возможность манипулировать контентом для администраторов;
    4. Регистрация, авторизация и роли для пользователей.
    
### Таблицы в базе данных:
```sql
TABLE images (
            id SERIAL PRIMARY KEY,
            path VARCHAR(255) NOT NULL,
            category VARCHAR(10) NOT NULL DEFAULT 'none' CHECK (category IN ('none', 'animals', 'sport', 'sky', 'cars'))
        )
```

```sql
TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(5) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
            favorite_category VARCHAR(10) NOT NULL DEFAULT 'animals' CHECK (favorite_category IN ('animals', 'sport', 'sky', 'cars'))
        )
```

### Запуск:
```sh
# net start postgresql-x64-17
node server.js
```
