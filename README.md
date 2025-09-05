## Project Title :
Furiquoeta

## Brief Description:
The technologies I used is I create this frontend file using Next.js and connect to backend with Supabase 


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

##How to run my project

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


## Live Demo  
You can check out the deployed project here: [furiquoeta.vercel.app](https://furiquoeta.vercel.app)

## Architecture Explanation:
After created figma, I started run create the next,js file with command 
```bash
npm create next-app@lastest mini_project
```
- Built frontend pages in `src/app/homepage/page.tsx` and `src/app/quoet/page.tsx`.  
- Set up Supabase and connected it with Next.js (local, client, server, middleware).  
- Created `src/action/` folder with:  
  - `getQuotes.ts` → fetch quotes from database.  
  - `quoet.ts` → store input data into database.  
 
