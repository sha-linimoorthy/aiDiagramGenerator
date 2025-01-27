This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the frontend server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Backend configuration
Navigate to server folder

**Download ollama server**:  [https://ollama.com/download](url)

Step 1: Create a Virtual Environment
1. Open your terminal or command prompt.
2. Navigate to your project directory:
   ```bash
   cd path/to/your/project
   ```
3. Create a virtual environment:
   - On **macOS/Linux**:
     ```bash
     python3 -m venv venv
     ```
   - On **Windows**:
     ```bash
     python -m venv venv
     ```
   - Replace `venv` with the name you want.
  
Step 2: Activate the Virtual Environment
1. Activate the virtual environment:
   - On **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```
   - On **Windows**:
     ```bash
     venv\Scripts\activate
     ```

Step 3: Install Dependencies from `requirements.txt`
1. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

Step 4: Run Backend server
   ```bash
   uvicorn app:app 
   ```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
