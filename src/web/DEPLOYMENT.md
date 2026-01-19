# Deploying to GitHub Pages

This guide covers deploying the Wallet Flow Visualizer to GitHub Pages using two methods: automatic deployment via GitHub Actions and manual deployment via npm.

## Prerequisites

1. GitHub repository with the code pushed
2. Node.js and npm installed locally
3. GitHub Pages enabled in repository settings (for automatic deployment)

## Method 1: Automatic Deployment (Recommended)

### Setup

1. **Enable GitHub Pages in Repository Settings**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to Main Branch**

   The workflow is configured to automatically deploy when:
   - Changes are pushed to `main` or `master` branch
   - Files in `src/web/` directory are modified
   - Or manually triggered via "Actions" tab

3. **Workflow Configuration**

   The workflow file is located at `.github/workflows/deploy-pages.yml`:
   - Builds the React app
   - Uploads artifacts to GitHub Pages
   - Deploys automatically
   - Runs on every push to main branch that affects `src/web/`

4. **Access Your Site**

   After successful deployment:
   ```
   https://[username].github.io/selfcustody/
   ```

   For example: `https://ademiroliveira.github.io/selfcustody/`

### Monitoring Deployment

1. Go to your repository's "Actions" tab
2. Click on the latest "Deploy to GitHub Pages" workflow
3. Monitor the build and deploy jobs
4. Once complete, visit your GitHub Pages URL

### Troubleshooting Automatic Deployment

**Build Fails:**
- Check the Actions log for error messages
- Ensure all dependencies are in `package.json`
- Verify TypeScript compiles without errors locally

**404 Error:**
- Ensure GitHub Pages is enabled in Settings → Pages
- Verify the base path in `vite.config.ts` matches your repo name
- Wait a few minutes for GitHub Pages to propagate changes

**Assets Not Loading:**
- Check that `base: '/selfcustody/'` is set correctly in `vite.config.ts`
- Verify the repository name matches the base path
- Check browser console for 404 errors

## Method 2: Manual Deployment

### Setup

1. **Install gh-pages Package**

   ```bash
   cd src/web
   npm install
   ```

   The `gh-pages` package is already included in `devDependencies`.

2. **Build and Deploy**

   ```bash
   npm run deploy
   ```

   This command:
   - Builds the production version
   - Pushes the `dist` folder to the `gh-pages` branch
   - GitHub automatically serves from this branch

3. **Configure GitHub Pages**

   If not already configured:
   - Go to Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Select the `gh-pages` branch and `/ (root)` folder
   - Click Save

4. **Access Your Site**

   ```
   https://[username].github.io/selfcustody/
   ```

### Troubleshooting Manual Deployment

**gh-pages Command Fails:**
```bash
# Ensure you're in the correct directory
cd src/web

# Install dependencies
npm install

# Try deploying again
npm run deploy
```

**Permission Denied:**
```bash
# Ensure you have push access to the repository
git remote -v

# Check your GitHub authentication
gh auth status
```

**Old Version Still Showing:**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait a few minutes for GitHub Pages CDN to update
- Check if deployment was successful: `git branch -r | grep gh-pages`

## Configuration Details

### Base Path Configuration

The `base` path in `vite.config.ts` must match your repository name:

```typescript
// For repository: github.com/username/selfcustody
base: '/selfcustody/'

// For user/org page: github.com/username/username.github.io
base: '/'
```

### Custom Domain (Optional)

1. **Add CNAME file to `public/` directory:**
   ```bash
   echo "wallet.yourdomain.com" > src/web/public/CNAME
   ```

2. **Update vite.config.ts:**
   ```typescript
   base: '/'  // Use root for custom domain
   ```

3. **Configure DNS:**
   - Add CNAME record pointing to `[username].github.io`
   - Or A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

4. **Enable Custom Domain in GitHub:**
   - Go to Settings → Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## Deployment Checklist

Before deploying:

- [ ] All TypeScript errors resolved (`npm run build` succeeds)
- [ ] Base path configured correctly in `vite.config.ts`
- [ ] `.nojekyll` file exists in `public/` directory
- [ ] Changes committed and pushed to repository
- [ ] GitHub Pages enabled in repository settings

After deploying:

- [ ] Site accessible at GitHub Pages URL
- [ ] All assets loading correctly (check browser console)
- [ ] Navigation works properly
- [ ] Export functionality works
- [ ] Responsive design works on mobile

## Local Preview of Production Build

Test the production build locally before deploying:

```bash
cd src/web

# Build for production
npm run build

# Preview the production build
npm run preview
```

Visit `http://localhost:4173` to test the production build.

## Updating the Deployment

### Automatic (GitHub Actions)
Simply push changes to the main branch:
```bash
git add .
git commit -m "Update wallet visualizer"
git push origin main
```

### Manual (gh-pages)
Run the deploy command:
```bash
cd src/web
npm run deploy
```

## Environment Variables

If you need environment-specific configuration:

1. **Create `.env.production` file:**
   ```env
   VITE_API_URL=https://api.example.com
   VITE_ANALYTICS_ID=GA-XXXXX
   ```

2. **Access in code:**
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

3. **For GitHub Actions, add secrets:**
   - Go to Settings → Secrets and variables → Actions
   - Add secrets as needed
   - Reference in workflow: `${{ secrets.SECRET_NAME }}`

## Performance Optimization

### Enable Compression
GitHub Pages automatically serves gzip-compressed files.

### Optimize Bundle Size
```bash
# Analyze bundle
npm run build -- --mode production

# Check chunk sizes in build output
# Consider code splitting for large dependencies
```

### CDN for Assets
For better performance, consider hosting large assets on a CDN:
- Images
- Videos
- Large JSON files

## Security Considerations

- Source maps are included for debugging (configured in `vite.config.ts`)
- To disable for production: set `sourcemap: false` in build config
- Sensitive data should never be committed to the repository
- Use environment variables for API keys and secrets

## Support

For issues:
1. Check the GitHub Actions logs
2. Verify local build succeeds: `npm run build`
3. Test production build locally: `npm run preview`
4. Check GitHub Pages status: https://www.githubstatus.com/
5. Review GitHub Pages documentation: https://docs.github.com/en/pages

## Alternative Deployment Platforms

While this guide focuses on GitHub Pages, you can also deploy to:

- **Vercel**: `npx vercel` (automatic Git integration)
- **Netlify**: Drag and drop `dist` folder or Git integration
- **Cloudflare Pages**: Git integration
- **AWS S3 + CloudFront**: For enterprise deployments
- **Azure Static Web Apps**: Microsoft ecosystem
- **Google Firebase Hosting**: Google ecosystem

For these platforms, you may need to adjust the `base` path in `vite.config.ts` to `/` instead of `/selfcustody/`.
