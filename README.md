# About this repo

This repo is the frontend code for www.froodom.org.
It is a NextJS app that uses the Froodom REST API (python FastAPI) to fetch data.

Hosted on Vercel and built with Typescript, TailwindCSS and NextUI.

## To run locally

Create a .env file using the .env.template file as a guide. Then run:

```bash
npm install
npm run dev
```

## Server components
This project uses server components to fetch data where it can to reduce the load on the client.
