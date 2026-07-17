# PriceGuard AI — лендинг для ЮKassa

Публичный сайт расширения: описание, тарифы, оферта, политика конфиденциальности, реквизиты.

## Локальный запуск

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

## Что заполнить перед публикацией

Отредактируйте `src/site.ts`:

| Поле | Пример | Зачем |
|------|--------|--------|
| `legal.fullName` | `Иванов Иван Иванович` | Оферта, реквизиты, ЮKassa |
| `legal.inn` | `123456789012` | Реквизиты / договор |
| `legal.email` | `you@domain.ru` | Поддержка и возвраты |
| `legal.telegram` | `@your_support` | Контакты |
| `chromeStoreUrl` | ссылка CWS | Кнопка «Установить» |

Тарифы уже как в расширении: **299 ₽/мес**, **2490 ₽/год**.

## Деплой на GitHub + Vercel

### 1) GitHub

1. Создайте репозиторий `priceguard-landing` на GitHub.
2. Установите Git (если нет в PATH) и выполните:

```bash
cd C:\Users\sj480\Projects\priceguard-landing
git init
git add .
git commit -m "Initial PriceGuard landing for YooKassa"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/priceguard-landing.git
git push -u origin main
```

### 2) Vercel (веб-интерфейс)

1. [vercel.com](https://vercel.com) → Add New Project → Import GitHub repo.
2. Framework: Vite, Build: `npm run build`, Output: `dist`.
3. Deploy → получите URL вида `https://priceguard-landing.vercel.app`.

### 3) Vercel MCP в Cursor (по вашей просьбе)

1. Cursor → Settings → MCP.
2. Добавьте официальный Vercel MCP (или через Cursor Marketplace / docs Vercel MCP).
3. Авторизуйте аккаунт Vercel, когда Cursor запросит доступ.
4. После этого агент сможет деплоить/смотреть проекты через MCP.

Пока MCP не подключён, деплой делайте через vercel.com или CLI:

```bash
npx vercel
npx vercel --prod
```

### 4) ЮKassa checklist

В личном кабинете ЮKassa при подключении магазина обычно просят:

- URL сайта (этот лендинг на Vercel)
- оферту (`/offer`)
- политику (`/privacy`)
- реквизиты (`/requisites`)
- страницу успешной оплаты (`/payment/success`)
- что продаёте, цены, как оплатить, что получает пользователь (блок на главной + оферта)

В Supabase расширения укажите:

```bash
supabase secrets set PAYMENT_RETURN_URL=https://priceguard-landing.vercel.app/payment/success
```

В расширении (`.env`):

```
VITE_PAYMENT_RETURN_URL=https://priceguard-landing.vercel.app/payment/success
VITE_REQUISITES_URL=https://priceguard-landing.vercel.app/requisites
```

После оплаты ЮKassa редиректит на `/payment/success?session=...`.
## Структура

```
src/
  site.ts              # ваши реквизиты и цены
  pages/HomePage.tsx
  pages/OfferPage.tsx
  pages/PrivacyPage.tsx
  pages/RequisitesPage.tsx
  components/Header.tsx, Footer.tsx, Layout.tsx
```
