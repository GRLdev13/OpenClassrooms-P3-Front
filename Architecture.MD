# Renote Architecture

## Overview

Renote is a note-taking application designed to help users create, organize, and manage personal notes with tags. It provides account registration and login, an authenticated dashboard for working with notes and tags, and a settings area for managing the user's profile, password, appearance, and account.

The application aims to keep note management simple: users can group notes with tags, quickly add or remove notes, and access their information through a focused dashboard.

## Technologies

- **React** builds the user interface from reusable components.
- **React Router** defines the application's routes and renders the correct page for each URL.
- **Redux Toolkit** stores shared client-side state, including the authenticated user.
- **RTK Query** handles requests to the backend API, authentication headers, response caching, and generated query or mutation hooks.
- **TypeScript** provides types for components, application state, and data transfer objects.
- **Tailwind CSS** provides utility classes for styling and responsive layouts.

## Routes

The route configuration is defined in `app/routes.ts`.

| URL | Route module | Purpose |
| --- | --- | --- |
| `/` | `app/routes/home.tsx` | Public landing page |
| `/login` | `app/routes/login-route.tsx` | User authentication |
| `/register` | `app/routes/register-route.tsx` | Account creation |
| `/dashboards` | `app/routes/dashboard-route.tsx` | Authenticated note and tag management |
| `/settings` | `app/routes/settings-route.tsx` | Authenticated user settings |

The dashboard and settings routes check for an authentication token in `localStorage` before rendering their content. Users without a token are redirected to `/login`.

## Application Structure

The root application component in `app/root.tsx` wraps all routes with the Redux `Provider`, making the store available throughout the component tree.

The Redux store is configured in `app/stores/store.ts`. It combines the user state slice with the RTK Query API reducer and middleware.

The API service in `app/services/dashboard-service.ts` is the main boundary between the frontend and backend. It uses RTK Query to load dashboard data and perform operations such as:

- Registering and logging in users
- Loading notes and tags
- Creating tags and notes
- Deleting notes
- Updating user details and passwords
- Deleting a user account

The dashboard route renders the dashboard feature from `app/dashboard/dashboards.tsx`. This feature loads the user's dashboard data, displays notes and tags, and refreshes the data after note or tag changes.

## Data Flow

1. React Router selects a route module based on the current URL.
2. Authenticated routes verify that a token exists before rendering protected content.
3. React components call generated RTK Query hooks to request or modify backend data.
4. RTK Query adds the bearer token to API requests and stores fetched data in the Redux store.
5. Components render loading, error, and success states from the query results.
