# Development Mode - Live CSS/Frontend Editing

## Quick Start

### 1. Initial Build
Build the Docker images once:
```bash
docker compose build
```

### 2. Start Vite in Watch Mode
In a separate terminal, run the frontend in watch mode:
```bash
cd console
npm install  # if not already done
npm run dev  # Runs Vite dev server with hot reload
```

Keep this terminal open. It will rebuild when you change CSS/JS files.

### 3. Start Docker with Dev Override
```bash
docker compose -f compose.yaml -f docker-compose.dev.yml up -d
```

## How It Works

- Your local `console/dist/` folder is mounted into the container
- Vite watches for changes and rebuilds to `dist/`
- Changes appear immediately (just refresh browser)
- No Docker rebuild needed! 🎉

## Workflow

1. Edit `console/src/index.css` (or any source file)
2. Vite automatically rebuilds to `console/dist/`
3. Refresh browser → see changes instantly

## Alternative: Build Manually

Instead of running Vite dev server, you can build manually after each change:

```bash
cd console
npm run build  # Build once after changes
```

Then refresh browser.

## Back to Production Mode

Stop dev mode and return to production:

```bash
# Stop dev containers
docker compose -f compose.yaml -f docker-compose.dev.yml down

# Start production (no volumes mounted)
docker compose up -d
```

## Tips

- **CSS changes**: Just save the file, Vite rebuilds in ~1 second
- **JS/TS changes**: Vite rebuilds, refresh browser
- **Package changes**: Stop everything, rebuild Docker image
- **Go backend changes**: Rebuild Docker image

## Troubleshooting

**Changes not showing?**
- Check Vite terminal for build errors
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Verify `console/dist/` has updated files

**Port conflicts?**
- Vite dev server runs on port 5173 by default
- Backend still on port 8081 (or your configured port)

