# Customer Review Module

A responsive, mobile-first React application for displaying and submitting customer reviews.

## Overview

This application demonstrates modern fullstack development practices by creating a customer review system with a React frontend and Node.js/Express backend. The module allows users to view existing reviews and submit new ones with proper validation.

## Features

- **Dynamic Review Display**: Reviews are fetched from a RESTful API and displayed in a responsive grid
- **Review Submission Form**: Includes input validation for name, rating and comment fields
- **Responsive Design**: Mobile first approach with breakpoints for tablet and desktop
- **Accessibility**: WCAG AA compliant with ARIA attributes, keyboard navigation and screen reader support
- **State Management**: Lightweight solution using React hooks and custom hooks
- **RESTful API**: Backend provides endpoints for fetching and creating reviews

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **SCSS Modules** for styling
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **TypeScript**
- **File-based storage** (JSON file for simplicity)

### Development Tools
- **ESLint** for code linting
- **Vitest** for testing
- **Prettier** for code formatting

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd customer-review
   ```

2. **Install dependencies**

# Install root dependencies

   ```bash
   npm install
   ```

   This installs dependencies for all packages in the monorepo (client, server and shared).

3. **Start the development servers**

   in the root folder - customer-review:

   ```bash
   npm run dev
   ```
   This will run the client,server and shared.

4. **Access the application**

   Open your browser and navigate to `http://localhost:5173` (Vite default port)

## Usage

### Viewing Reviews
- Reviews are automatically loaded when the page opens
- Reviews are displayed in a responsive grid layout
- Each review shows the customer's name, rating (stars) and comment

### Submitting Reviews
- Fill out the form with your name, rating (1-5 stars) and comment
- The form includes real time validation
- Character counter for comments (max 60 characters)
- Submit button is enabled only when all fields are valid

### Accessibility Features
- All form fields include proper labels and ARIA attributes
- Keyboard navigation support for rating stars
- Screen reader announcements for form validation
- High contrast colors and readable fonts

## API Endpoints

The backend provides the following RESTful endpoints:

- `GET /reviews` - Retrieve all reviews
- `POST /reviews` - Create a new review

Example API usage:
```javascript
// Get all reviews
const response = await fetch('http://localhost:5000/reviews');
const reviews = await response.json();

// Create a new review
const newReview = {
  name: "John Doe",
  rating: 5,
  comment: "Great product!"
};

await fetch('http://localhost:5000/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newReview)
});
```

## Project Structure

```
customer-review/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   └── App.tsx         # Main application component
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── modules/        # Feature modules
│   │   ├── config/         # Configuration files
│   │   └── app.ts          # Express app setup
│   └── package.json
├── shared/                 # Shared types and utilities
│   └── src/types/          # TypeScript interfaces
└── package.json            # Root package.json
```


## Testing

Run the test suite from the client directory:
```bash
cd client

npm run test
```

Or run with the visual UI:
```bash
npm run test:ui
```


