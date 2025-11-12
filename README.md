# Kenzygram

A modern, feature-rich Instagram clone frontend application built with React and TypeScript. This application provides a complete social media experience with posts, stories, user profiles, and real-time interactions.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Backend API Setup](#backend-api-setup)
- [Development](#development)
- [Deployment](#deployment)

## Live Demo

🌐 **Live Application:** [View Demo](https://kenzygram.vercel.app)

![Application Screenshot](./screenshot.png)

## Features

- 📱 **Responsive Design** - Mobile-first, fully responsive UI
- 🔐 **Authentication** - User registration, login, and logout
- 📸 **Posts** - Create, view, like, and comment on posts
- 📖 **Stories** - Instagram-style stories with swipeable views
- 👤 **User Profiles** - View and edit user profiles
- 🔍 **Search** - Search for users and content
- 💬 **Comments** - Real-time commenting system
- ❤️ **Likes** - Like and unlike posts
- 📤 **Image Upload** - Image resizing and upload functionality
- 🌐 **Social Login** - Facebook OAuth integration
- 🎨 **Material-UI** - Beautiful, modern UI components
- 🔔 **Notifications** - Toast notifications for user feedback
- 🚀 **GraphQL Integration** - Efficient data fetching with Apollo Client
- 🔄 **REST API Integration** - Traditional REST endpoints for authentication

## Technology Stack

### Frontend Framework

- **React 17.x** - JavaScript library for building user interfaces
- **TypeScript 4.x** - Typed superset of JavaScript

### Build Tools

- **RSBuild** - Fast, modern build tool (alternative to Webpack)
- **RSBuild Plugins**:
  - `@rsbuild/plugin-react` - React support
  - `@rsbuild/plugin-svgr` - SVG as React components
  - `@rsbuild/plugin-node-polyfill` - Node.js polyfills

### State Management & Data Fetching

- **Apollo Client 3.x** - GraphQL client for React
- **React Context API** - Built-in state management
- **Axios** - HTTP client for REST API calls

### UI Libraries

- **Material-UI (MUI) 4.x** - React component library
  - `@material-ui/core` - Core components
  - `@material-ui/icons` - Icon components
  - `@material-ui/lab` - Experimental components

### Routing

- **React Router DOM 5.x** - Declarative routing for React

### Additional Libraries

- **React Hot Toast** - Beautiful toast notifications
- **React Insta Stories** - Instagram-style stories component
- **React Swipeable Views** - Touch-friendly swipeable views
- **React Image File Resizer** - Client-side image resizing
- **React Facebook Login** - Facebook OAuth integration
- **Lodash** - Utility library
- **Validator** - String validation library
- **React Use** - Collection of React hooks

### Testing

- **Jest** - JavaScript testing framework
- **React Testing Library** - Simple and complete testing utilities
- **@testing-library/user-event** - User interaction simulation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 14.x (recommended: 16.x or higher)
- **npm** >= 6.x (comes with Node.js) or **yarn**
- **Git** - Version control system
- **Backend API** - Laravel Instagram API must be set up and running
  - See [Backend API Setup](#backend-api-setup) for more information
  - Repository: [Laravel-Instagram-API](https://github.com/Ekenzy-101/Laravel-Instagram-API)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd React-Instagram-Clone
```

### 2. Install Dependencies

Install all project dependencies:

```bash
npm install --force
```

**Note:** The `--force` flag is used to resolve potential dependency conflicts. If you encounter issues, you can also try:

```bash
npm install
```

or

```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the required environment variables (see [Configuration](#configuration) section below).

### 4. Start Development Server

```bash
npm start
```

The application will open in your browser at `http://localhost:3000` (or the next available port).

## Configuration

Configure your application by creating a `.env` file in the root directory with the following variables:

### API Endpoints

```env
REACT_APP_REST_API=http://localhost:8000
```

The base URL for your REST API endpoints (authentication, etc.).

```env
REACT_APP_GRAPHQL_API=http://localhost:8000/graphql
```

The GraphQL API endpoint URL.

**Example for production:**

```env
REACT_APP_REST_API=https://your-api-domain.com
REACT_APP_GRAPHQL_API=https://your-api-domain.com/graphql
```

### Facebook OAuth

```env
REACT_APP_FACEBOOK_APP_ID=your_facebook_app_id
```

Your Facebook App ID for social authentication. To get a Facebook App ID:

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Copy your App ID

### Complete .env Example

```env
# API Endpoints
REACT_APP_REST_API=http://localhost:8000
REACT_APP_GRAPHQL_API=http://localhost:8000/graphql

# Facebook OAuth
REACT_APP_FACEBOOK_APP_ID=1234567890123456
```

**Important Notes:**

- All environment variables must be prefixed with `REACT_APP_` to be accessible in the React application
- Restart the development server after changing environment variables
- Never commit `.env` files to version control (ensure `.env` is in `.gitignore`)

## Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm start
```

This will:

- Start the RSBuild development server
- Open the app in your default browser
- Enable hot module replacement (HMR) for instant updates
- Show compilation errors in the browser

### Preview Production Build

Build and preview the production version locally:

```bash
npm run build
npm run preview
```

This creates an optimized production build and serves it locally for testing.

## Building for Production

### Create Production Build

```bash
npm run build
```

This command:

- Optimizes the code for production
- Minifies JavaScript and CSS
- Creates a `build/` directory with production-ready files
- Generates source maps for debugging (if configured)

### Build Output

The production build will be in the `build/` directory, ready to be deployed to any static hosting service.

### Deployment Options

- **Vercel** - Configured with `vercel.json`
- **Netlify** - Drag and drop the `build/` folder
- **Heroku** - Use static buildpack
- **AWS S3 + CloudFront** - Upload `build/` contents
- **GitHub Pages** - Deploy from `build/` directory

## Project Structure

```
React-Instagram-Clone/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   └── ...                # Other public assets
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   ├── containers/        # Page-level components
│   ├── routes/            # Route definitions
│   ├── utils/            # Utility functions and helpers
│   │   └── context/      # React Context providers
│   ├── common/           # Shared components/utilities
│   ├── App.tsx           # Root component
│   ├── App.css           # App styles
│   ├── index.tsx         # Application entry point
│   └── styles.css        # Global styles
├── build/                # Production build output (generated)
├── node_modules/        # Dependencies (generated)
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── rsbuild.config.ts    # RSBuild configuration
├── vercel.json          # Vercel deployment configuration
└── .env                 # Environment variables (create this)
```

## Backend API Setup

This frontend application requires the Laravel Instagram API backend to be running. Follow these steps:

1. **Clone and Setup Backend API:**

   ```bash
   git clone https://github.com/Ekenzy-101/Laravel-Instagram-API.git
   cd Laravel-Instagram-API
   composer install
   npm install
   ```

2. **Configure Backend:**

   - Set up `.env` file with database, AWS S3, and email configuration
   - Run migrations: `php artisan migrate`
   - Generate keys: `php artisan key:generate` and `php artisan jwt:secret`

3. **Start Backend Server:**

   ```bash
   php artisan serve
   ```

   Backend will run on `http://localhost:8000`

4. **Update Frontend .env:**
   Ensure your frontend `.env` points to the correct backend URLs:
   ```env
   REACT_APP_REST_API=http://localhost:8000/api
   REACT_APP_GRAPHQL_API=http://localhost:8000/graphql
   ```

For detailed backend setup instructions, visit: [Laravel-Instagram-API Repository](https://github.com/Ekenzy-101/Laravel-Instagram-API)

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally

### Code Style

- Follow React best practices and conventions
- Use TypeScript for type safety
- Follow the existing code structure and patterns
- Use functional components with hooks

### Testing

Run tests with:

```bash
npm test
```

### Debugging

- Use React Developer Tools browser extension
- Check browser console for errors
- Use Apollo Client DevTools for GraphQL debugging
- Enable source maps in development mode

### Common Issues

**Port Already in Use:**

```bash
# Kill process on port 3000 (or your port)
lsof -ti:3000 | xargs kill -9
```

**Dependency Conflicts:**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --force
```

**Environment Variables Not Loading:**

- Ensure variables are prefixed with `REACT_APP_`
- Restart the development server after changes
- Check `.env` file is in the root directory

## Deployment

### Vercel Deployment

The project includes `vercel.json` configuration. Deploy to Vercel:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Environment Variables in Production

Set environment variables in your hosting platform:

- **Vercel:** Project Settings → Environment Variables
- **Netlify:** Site Settings → Build & Deploy → Environment
- **Heroku:** `heroku config:set REACT_APP_REST_API=...`

### Build Optimization

The production build is automatically optimized:

- Code splitting
- Tree shaking
- Minification
- Asset optimization

## License

This project is open-sourced software licensed under the [ISC license](https://opensource.org/licenses/ISC).

## Support

For issues, questions, or contributions:

- Open an issue on the repository
- Check the backend API documentation
- Review the code comments for implementation details

## Author

**Emmanuel Onyekaba**

---

**Note:** Make sure your backend API is running and properly configured before starting the frontend application. The frontend depends on the backend for all data operations and authentication.
