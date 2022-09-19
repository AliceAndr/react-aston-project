Реализованы требования к функциональности.

## React

- Функциональные компоненты c хуками в приоритете над классовыми.
- Есть четкое разделение на умные и глупые компоненты - [pages](./src/pages) и [components](./src/components).
- Есть рендеринг списков - [BookSearchResults](./src/components/BooksSearchResults/BooksSearchResults.tsx), [FavoritesPage](./src/pages/FavoritesPage/FavoritesPage.tsx), [HistoryPage](./src/pages/HistoryPage/HistoryPage.tsx).
- Реализована хотя бы одна форма - [SignUp](./src/pages/SignUp/SignUp.tsx), [SignIn](./src/pages/SignIn/SignIn.tsx).
- Есть применение Контекст API - [ThemeProvider](./src/ThemeProvider.tsx).
- Есть применение предохранителя - [App](./src/App.tsx), [ErrorFallback](./src/components/ErrorFallback/ErrorFallback.tsx).
- Есть хотя бы один кастомный хук - [hooks](./src/hooks/hooks.ts).
- Хотя бы несколько компонентов используют PropTypes - [TextParagraph](./src/components/TextParagraph/TextParagraph.jsx), [SectionCover](./src/components/SectionCover/SectionCover.jsx).
- Поиск не должен триггерить много запросов к серверу - [useDebounce](./src/hooks/hooks.ts), использован в [BooksSection](./src/pages/BooksSection/BooksSection.tsx).
- Есть применение lazy + Suspense - [Home](./src/pages/Home/Home.tsx), [BooksSection](./src/pages/BooksSection/BooksSection.tsx).

## Redux

- Используем Modern Redux with Redux Toolkit - [redux](./src/redux/).
- Используем слайсы - [userSlice](./src/redux/slices/userSlice.ts).
- Есть хотя бы одна кастомная мидлвара - [checkLoginMiddleware](./src/middleware/checkLoginMiddleware.ts).
- Используется RTK Query - [booksApi](./src/redux/api/booksApi.ts), [housesApi](./src/redux/api/housesApi.ts).
- Используется Transforming Responses - [booksApi](./src/redux/api/booksApi.ts), [housesApi](./src/redux/api/housesApi.ts).

## Необязательные требования

- Использован TypeScript.
