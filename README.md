# AArena Testing

This is a simple project to learn and experiment some features of Next.js, NextAuth, Prisma, and Tailwind CSS.

## Features

- [x] Next.js
- [x] Server Actions
- [x] Form Validation
- [x] FormState and FormStatus
- [ ] Optimistic Updates
- [x] NextAuth (Google)
- [x] MongoDB
- [x] Prisma
- [x] Tailwind CSS
- [x] Formik
- [x] Yup

## Prerequisites

Make sure you have the following installed before running the project:

- Node.js and npm (Node Package Manager)
- MongoDb atlas database (or another supported database for Prisma)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/dead8309/AArenaTesting.git
    cd AArenaTesting
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up your environment variables:**

    Create a `.env.local` file in the root directory and add the following:

    ```env
    NEXTAUTH_SECRET=secret
    DATABASE_URL="db url"
    GOOGLE_CLIENT_ID="GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="GOOGLE_CLIENT_SECRET"
    NEXTAUTH_URL=http://localhost:3000
    ```

4. **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

5. **Start the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Project Structure

- `app/`: Pages and API routes
- `public/`: Static assets
- `components/`: Reusable React components
- `prisma/`: Prisma database schema and configurations

## Technologies Used

- [Next.js](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [Shadcn/UI](https://github.com/shadcn/ui)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.