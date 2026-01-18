# Studio Legacy Updates

This project is a web application built with Next.js and TypeScript.

## Getting Started

Follow these steps to get a local development environment running.

### Prerequisites

- Node.js (v20 recommended)
- npm

### Installation

1.  Clone the repository or use your existing local files.
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

Start the local development server with:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create a production-ready build of the application, run:
```bash
npm run build
```

## Deployment

This project is ready for deployment on modern hosting platforms.

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new). Connect your GitHub repository to Vercel, and it will automatically build and deploy your application with every push to the main branch.

### Firebase Hosting

This repository also includes a GitHub Actions workflow (`.github/workflows/firebase-preview.yml`) to automatically deploy pull requests to a Firebase Hosting preview channel. For more details on configuring this, see the [Firebase preview documentation](./scripts/firebase-preview.md).
