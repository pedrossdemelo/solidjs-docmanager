<div align="center">
  <h1>Solid.js docmanager</h1>

  <p>
    <strong>A solidjs learning exercise</strong>
  </p>

  <a href="https://solidjs-docmanager.vercel.app">https://solidjs-docmanager.vercel.app</a>
</div>

A gui for managing documents with a django rest api. No auth/permissions are implemented.

## Setup

1. Install dependencies

```sh
pnpm install # You can also use yarn or npm
```

2. Run the app in development mode

```sh
pnpm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deploy

1. Install the [vercel cli](https://vercel.com/docs/cli)

```sh
npm install -g vercel
```

2. Build the app for production to the `dist` folder

```sh
npm run build
```

3. Deploy the `dist` folder to vercel
  
  ```sh
  vercel dist
  ```
<sub>If you're using another provider, don't forget to setup redirects to index.html</sub>

