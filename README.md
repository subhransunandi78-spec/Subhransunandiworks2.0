# Jack — 3D Creator portfolio

Vite + React + TypeScript + Tailwind CSS + Framer Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
npm run preview    # serve the built site (also reachable from other devices on your Wi-Fi)
```

## Deploy to Vercel (public URL, works on any device)

1. Make sure `package.json` is at the **root** of the Git repo you push
   (don't push the folder that *contains* `jack-portfolio/`).
   If you can't, set **Settings → General → Root Directory** to `jack-portfolio`.
2. Import the repo in Vercel. Settings should auto-detect as:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy. Open the `*.vercel.app` URL from any phone, tablet or laptop.

`vercel.json` already contains these settings plus a rewrite to `index.html`.
