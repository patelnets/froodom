# Froodom frontend

## To run locally

Create a .env file using the .env.template file as a guide. Then run:

```bash
npm install
npm run dev
```

## Server components

This project uses server components to fetch data where it can to reduce the load on the client.


# Previous issues faced
## /api/auth/* not found 404
A very hard to debug issue where the user couldn't login or sign out in vercel deployment but could do it locally.
The issue was because there was a folder called api in the root directory and vercel somehow freaks out when it sees that folder and doesn't deploy the /api/auth/* routes properly.
The solution was to rename the api folder.
