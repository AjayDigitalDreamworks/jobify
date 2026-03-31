# 📚 Development Setup Guide

## System Requirements

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher (comes with Node.js)
- **MongoDB Atlas Account**: https://www.mongodb.com/cloud/atlas (Free tier available)
- **Git**: v2.0.0 or higher
- **RAM**: 4GB minimum
- **Disk Space**: 2GB minimum

## Step-by-Step Setup

### Phase 1: Environment Setup

#### 1.1 Install Node.js
1. Download from https://nodejs.org/ (LTS version recommended)
2. Run the installer and follow the prompts
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### 1.2 Install Git
1. Download from https://git-scm.com/
2. Run the installer
3. Verify:
   ```bash
   git --version
   ```

#### 1.3 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new organization
4. Create a new project (name it "jobify")
5. Create a cluster (choose Free tier)
6. Wait for cluster to deploy (takes 2-3 minutes)

### Phase 2: Project Setup (Windows)

#### 2.1 Using Setup Script
```bash
cd c:\Users\YourUsername\Desktop\Jobify\jobify
setup.bat
```

#### 2.2 Manual Setup
```bash
# Navigate to project
cd c:\Users\YourUsername\Desktop\Jobify\jobify

# Install all dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..
```

### Phase 3: Configure MongoDB

#### 3.1 Get Connection String
1. Log in to MongoDB Atlas
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy connection string
5. It should look like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/jobify?retryWrites=true&w=majority
   ```

#### 3.2 Update Server Environment
1. Open `server/.env`
2. Replace the MONGODB_URI with your connection string:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/jobify?retryWrites=true&w=majority
   ```
3. Update JWT_SECRET (use any random string for development):
   ```
   JWT_SECRET=jobify-dev-secret-abc123
   ```

### Phase 4: Start Development

#### Option A: Using Root Command (Recommended)

```bash
# From root directory (jobify/)
npm run dev
```

This runs both frontend and backend simultaneously.

**Output should show:**
```
[0] 🚀 Server running on http://localhost:5000
[1] ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

#### Option B: Using Separate Terminals

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Phase 5: Verification

#### Check Backend
1. Open browser
2. Visit: http://localhost:5000/api/health
3. You should see:
   ```json
   {
     "status": "Backend is running ✅",
     "timestamp": "2026-03-31T..."
   }
   ```

#### Check Frontend
1. Visit: http://localhost:3000
2. You should see:
   - ✅ Backend connected
   - Jobs section
   - Refresh button

#### Check MongoDB Connection
1. Terminal should show:
   ```
   ✅ MongoDB connected successfully
   ```

## Development Workflow

### Making Changes

1. **Backend Changes**
   - Edit files in `server/` folder
   - Nodemon will automatically restart

2. **Frontend Changes**
   - Edit files in `client/pages/` or create components
   - Next.js hot reload is automatic

3. **Database Models**
   - Add models in `server/models/`
   - Update routes in `server/`

### Code Structure

```
server/
├── server.js          # Entry point (middleware, routes)
├── models/            # Database schemas
│   ├── User.js
│   └── Job.js
├── routes/            # API routes (to be created)
├── controllers/       # Business logic (to be created)
├── middleware/        # Custom middleware (to be created)
├── package.json
├── .env
└── .env.example

client/
├── pages/
│   ├── index.js      # Home page
│   ├── _app.js       # App wrapper (to be created)
│   └── _document.js  # Document (to be created)
├── components/        # Reusable components (to be created)
├── public/            # Static files (to be created)
├── styles/            # CSS files (to be created)
├── utils/             # Helper functions (to be created)
├── package.json
├── .env.local
└── next.config.js
```

## Troubleshooting

### Issue: Port 5000 Already in Use

**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Change port in server/.env if needed
PORT=5001
```

### Issue: MongoDB Connection Failed

**Check:**
- [ ] Connection string is correct
- [ ] Username and password are correct
- [ ] Database name is "jobify"
- [ ] IP whitelist includes your IP (or use 0.0.0.0/0 for development)
- [ ] MongoDB server is running

**MongoDB IP Whitelist:**
1. Go to MongoDB Atlas dashboard
2. Click "Security" → "Network Access"
3. Click "Add IP Address"
4. Add your IP or toggle "Allow Access from Anywhere" (development only)

### Issue: npm install Fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -r node_modules
rm package-lock.json

# Reinstall
npm install
```

### Issue: Cannot Find Module

**Solution:**
```bash
# Make sure you're in correct directory
# Are you in server/ or client/?

# Reinstall dependencies
npm install
```

## Environment Variables Reference

### Server (.env)
| Variable | Value | Required |
|----------|-------|----------|
| PORT | 5000 | No (default) |
| NODE_ENV | development | No |
| MONGODB_URI | Your MongoDB connection string | Yes |
| JWT_SECRET | Any secret string | Yes |

### Client (.env.local)
| Variable | Value | Required |
|----------|-------|----------|
| NEXT_PUBLIC_API_URL | http://localhost:5000/api | Yes |

## Next Development Steps

1. **Create API Routes**
   ```
   server/routes/jobs.js
   server/routes/users.js
   ```

2. **Create Controllers**
   ```
   server/controllers/jobController.js
   server/controllers/userController.js
   ```

3. **Create React Components**
   ```
   client/components/JobCard.js
   client/components/Navbar.js
   client/pages/jobs.js
   ```

4. **Add Authentication**
   ```
   server/routes/auth.js
   server/middleware/auth.js
   ```

## Useful Commands

```bash
# View logs
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests (when added)
npm test

# View git status
git status

# Create new branch
git checkout -b feature/feature-name
```

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Express Docs**: https://expressjs.com/
- **MongoDB Docs**: https://docs.mongodb.com/
- **Node.js Docs**: https://nodejs.org/docs/

---

**Need Help?** Check the main README.md or GIT_WORKFLOW.md
