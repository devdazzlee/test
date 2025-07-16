This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Firebase Auth + User Dashboard

### Features
- Firebase Email/Password authentication (Sign up, Login, Logout)
- Google Sign-In option
- Protected `/dashboard` route (only accessible after login)
- User profile stored in Firestore (`users/{uid}`: name, email, createdAt)
- Auth state managed globally with React Context
- Best practices: modular Firebase config, SSR/CSR compatibility, error handling, redirects

### Usage
1. `npm install` (if not already)
2. `npm run dev`
3. Visit `/signup` or `/login` to authenticate
4. After login, access `/dashboard` (protected)
5. Logout from dashboard

### File Structure
- `app/config/config.ts`: Firebase config and exports
- `app/components/AuthProvider.tsx`: Auth context/provider
- `app/signup/page.tsx`: Signup page
- `app/login/page.tsx`: Login page
- `app/dashboard/page.tsx`: Protected dashboard
- `app/layout.tsx`: Wraps app in AuthProvider

---

**Security Note:** In production, move Firebase config to environment variables.
