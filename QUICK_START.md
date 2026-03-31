# ⚡ QUICK START GUIDE - 5 MINUTES

## TL;DR (Super Quick)

```bash
# 1. In project root directory
npm install

# 2. Update server/.env with MongoDB URI (get from MongoDB Atlas)
# Change this line:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobify?retryWrites=true&w=majority

# 3. Run everything
npm run dev
```

Then visit:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health
- **Both running**: 🎉

---

## 25-Second Setup Checklist

- [ ] MongoDB Atlas cluster created? https://mongodb.com/cloud/atlas
- [ ] Copied connection string?
- [ ] Pasted into `server/.env`? (MONGODB_URI)
- [ ] Ran `npm install`?
- [ ] Ran `npm run dev`?
- [ ] Can see both services running? (ports 3000 & 5000)

---

## What Just Happened?

### Backend (Server)
- ✅ Express.js running on port 5000
- ✅ MongoDB connected
- ✅ Basic API routes working
- ✅ Auto-restarts on file changes (nodemon)

### Frontend (Client)
- ✅ Next.js running on port 3000
- ✅ Connected to backend API
- ✅ Shows health status
- ✅ Hot-reload enabled

---

## Testing Everything

### Test REST API (Windows PowerShell)
```powershell
# Check if backend is running
Invoke-WebRequest -Uri http://localhost:5000/api/health

# Should show: "Backend is running ✅"
```

### Test REST API (Linux/Mac)
```bash
curl http://localhost:5000/api/health
```

### Test Frontend
1. Open browser
2. Go to http://localhost:3000
3. Should show:
   - ✅ Backend connected
   - Jobs section
   - Refresh button

---

## Folder Structure (What You Have Now)

```
jobify/
├── client/               ← Frontend (Next.js)
│   ├── pages/
│   │   ├── index.js      ← Home page
│   │   └── _app.js       ← App setup
│   ├── styles/
│   │   └── globals.css   ← Global styles
│   ├── .env.local        ← Backend URL
│   ├── package.json
│   └── next.config.js
│
├── server/               ← Backend (Express)
│   ├── models/
│   │   ├── User.js       ← User schema
│   │   └── Job.js        ← Job schema
│   ├── server.js         ← Main server
│   ├── .env              ← MongoDB URI
│   ├── .env.example      ← Template
│   └── package.json
│
├── package.json          ← Root scripts
├── README.md             ← Full documentation
├── SETUP_GUIDE.md        ← Detailed setup
├── GIT_WORKFLOW.md       ← Git guide
└── SETUP_CHECKLIST.md    ← Verification
```

---

## Troubleshooting (5 Common Issues)

### 🚨 "Cannot find module"
```bash
# Clear cache and reinstall
npm cache clean --force
rm -r node_modules
npm install
```

### 🚨 "Port 5000 already in use"
```bash
# Change port in server/.env
PORT=5001
```

### 🚨 "MongoDB connection failed"
- Check `server/.env` has correct MongoDB URI
- Verify IP in MongoDB Atlas Network Access
- Ensure cluster is deployed

### 🚨 "CORS error" (Frontend can't reach Backend)
- Verify backend is running on 5000
- Check `client/.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

### 🚨 "Cannot find 'develop' branch"
```bash
git branch -M main
git checkout -b develop
```

---

## Now What? (Next Steps)

### Option 1: Just Explore
- Modify `client/pages/index.js` to change homepage
- Server auto-restarts when you change files
- Frontend hot-reloads automatically

### Option 2: Start Development
```bash
# Create a feature branch
git checkout develop
git checkout -b feature/my-feature

# Make changes
# Commit
git add .
git commit -m "feat: my feature"

# Create PR to develop branch
```

### Option 3: Build a Feature
1. **Authentication** (Login/Signup)
2. **Job Listing** (Display jobs from DB)
3. **Job Creation** (Employers post jobs)
4. **User Profile** (Profile page)
5. **Search** (Find jobs)

---

## Useful Commands

```bash
# Start both (from root)
npm run dev

# Just backend
cd server && npm run dev

# Just frontend
cd client && npm run dev

# Build for production
npm run build

# Check git status
git status

# See all branches
git branch -a
```

---

## Environment Variables (All You Should Know)

### `server/.env`
```
MONGODB_URI=<your MongoDB connection string>
JWT_SECRET=any-secret-string
PORT=5000
NODE_ENV=development
```

### `client/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## That's It! 🎉

You now have:
- ✅ Full-stack setup running
- ✅ Frontend connected to backend
- ✅ Database ready
- ✅ Git configured
- ✅ Development environment ready

**Happy coding!** 🚀

For more details, see:
- Complete setup: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Full docs: [README.md](README.md)
- Git workflow: [GIT_WORKFLOW.md](GIT_WORKFLOW.md)
