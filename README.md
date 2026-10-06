# Altizachen

Altizachen is a second-hand marketplace for buying and selling used items.

## Frontend

The web app is built with React and is designed to work well on both desktop and mobile.

### Stack

- React
- React Router
- SCSS
- Axios
- Cloudinary

## Local development

Install dependencies:

```bash
npm install
```

Set the API URL in `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the app:

```bash
npm start
```

The local setup uses port 3001.

## Features

- Browse, search, filter and sort listings
- Listing pages with image galleries
- User accounts and profiles
- Create and manage listings
- Recently viewed listings
- Responsive mobile navigation

## Structure

Most UI components are in `src/cmps`, page-level views are in `src/pages`, and global styles are in `src/styles`.

## Deployment

The frontend is deployed with Vercel.
