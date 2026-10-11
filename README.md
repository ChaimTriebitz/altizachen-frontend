# Altizachen — Second-Hand Marketplace

Altizachen is a responsive marketplace for discovering and listing second-hand items. The project includes a React web client and a separate Express/MongoDB API.

> **Demo access:** The frontend is deployed on Vercel at [altizachen-frontend-ivory.vercel.app](https://altizachen-frontend-ivory.vercel.app). The current Vercel project has deployment-level SSO protection enabled, so public visitors may need access granted before this can be used as a recruiter-facing demo.

## Features

- Browse marketplace listings and open individual listing pages
- Search listings and filter by category
- Sort by newest, oldest, and price
- Create, edit, and delete listings while authenticated
- Register, sign in, and manage a user profile
- Upload listing and profile images through Cloudinary
- View recently viewed listings
- Forgot-password and password-reset flows
- Responsive layout and mobile navigation
- Messaging UI and an AI-related API route

## Tech stack

- **UI:** React 18, React Router 6
- **Styling:** Sass / SCSS
- **HTTP:** Axios
- **Images:** Cloudinary
- **API:** Node.js, Express
- **Data and authentication:** MongoDB, Mongoose, JWT

## Repositories

- [Frontend](https://github.com/ChaimTriebitz/altizachen-frontend)
- [Backend API](https://github.com/ChaimTriebitz/altizachen-backend)

## Architecture

The frontend and backend are separate applications:

- `src/pages` contains route-level views.
- `src/cmps` contains reusable UI components.
- `src/config/api.js` selects the API base URL.
- The backend's `routes/` map API paths to controllers.
- `controllers/` contain request handling and business logic.
- `models/` define MongoDB documents with Mongoose.
- `middleware/` contains authentication and error handling.
- `utils/` contains shared helpers, including image and email handling.

The API exposes authentication, user, listing, and AI-related routes. Listing creation and listing updates/deletions require a valid bearer token; the API checks listing ownership before allowing changes.

## Run locally

### Requirements

- Node.js and npm
- A MongoDB instance (local or Atlas)
- A Cloudinary account/preset for image uploads

### 1. Start the backend

Clone [altizachen-backend](https://github.com/ChaimTriebitz/altizachen-backend), install dependencies, and create a local `.env` file:

```bash
npm install
```

```env
MONGO_URI=mongodb://127.0.0.1:27017/altizachen
FRONTEND_URL=http://localhost:3001
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRATION=7d
CLOUDINARY_NAME=your-cloudinary-cloud-name
CLOUDINARY_UPLOAD_PRESET=your-unsigned-upload-preset
```

Start the API:

```bash
npm start
```

The local API listens on port `5000`. Its health endpoint is `http://localhost:5000/api/health`.

### 2. Start the frontend

Clone [altizachen-frontend](https://github.com/ChaimTriebitz/altizachen-frontend), then install dependencies:

```bash
npm install
```

Create a frontend `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the React development server:

```bash
PORT=3001 npm start
```

On Windows PowerShell, use `$env:PORT=3001; npm start` instead. Open [http://localhost:3001](http://localhost:3001).

## API overview

| Method | Path | Purpose | Access |
| --- | --- | --- | --- |
| GET | `/api/health` | Service and database health | Public |
| POST | `/api/auth/register` | Create an account | Public |
| POST | `/api/auth/login` | Sign in | Public |
| POST | `/api/auth/forgotpassword` | Request a password reset | Public |
| PUT | `/api/auth/resetpassword/:resetToken` | Reset a password | Reset token |
| GET | `/api/posts` | List/search/filter/sort listings | Public |
| GET | `/api/posts/:id` | Get a listing | Public |
| POST | `/api/posts/upload` | Create a listing | Bearer token |
| PUT | `/api/posts/:id` | Update an owned listing | Bearer token + ownership |
| DELETE | `/api/posts/:id` | Delete an owned listing | Bearer token + ownership |
| GET/PATCH | `/api/users` | Read/update the current user | Bearer token |

## Quality checks

The frontend uses Create React App scripts:

```bash
npm run build
npm test -- --watchAll=false
```

A small component smoke test runs in CI. Automated coverage for authentication, listing CRUD, and image uploads is still a work in progress.

## Security and configuration notes

- Never commit `.env` files, database credentials, JWT secrets, email credentials, or API keys.
- Use a unique, high-entropy `JWT_SECRET` outside local development.
- Configure the Cloudinary upload preset with appropriate file-type, size, and folder restrictions. Unsigned upload presets are public-facing and should be restricted.
- Keep the production frontend origin in the backend's `FRONTEND_URL` setting aligned with the deployed frontend.
- Before sharing a public portfolio demo, review Vercel deployment protection and confirm the app is accessible in a private/incognito browser.

## Current status

The app is deployed on Vercel and its main browsing/listing flow has been manually checked. Automated regression tests and a full end-to-end pass (authentication, listing CRUD, image uploads, and password reset) remain future work.
