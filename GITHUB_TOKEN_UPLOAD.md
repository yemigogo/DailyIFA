# GitHub Token Upload Instructions

## Replace Token in Commands

Your commands are correct, but you need to replace `your-token` with your actual GitHub token:

```bash
# Initialize Git if it hasn't been done
git init

# Set remote GitHub repo (replace YOUR_ACTUAL_TOKEN)
git remote add origin https://YOUR_ACTUAL_TOKEN@github.com/yemigogo/ifa-daily-reading-app.git

# Rename branch to main (if needed)
git branch -M main

# Add all files
git add .

# Commit with a message
git commit -m "Initial commit from Replit"

# Push to GitHub
git push -u origin main
```

## Alternative: Use Standard Authentication

If you prefer not to put the token in the URL, use:

```bash
git remote add origin https://github.com/yemigogo/ifa-daily-reading-app.git
git push -u origin main
```

Then enter credentials when prompted:
- Username: `yemigogo`
- Password: Your GitHub Personal Access Token

## Your Complete Platform Upload

This will upload your entire Ifá Daily Reading platform:
- Complete 5-Orisha healing system
- Interactive 3D cosmic realms
- Sacred frequency healing
- 17 spiritual learning modules
- Professional documentation
- Mobile-responsive design

Run the commands with your actual token to complete the upload!