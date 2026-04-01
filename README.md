# 🚀 Jobify - Job Portal Application

## 📋 Project Structure

```
jobify/
├── client/              # React (Vite) Frontend
│   ├── src/            # React source files
│   ├── package.json    # Frontend dependencies
│   ├── .env.local      # Frontend env config
│   └── vite.config.js  # React (Vite) configuration
│
├── server/             # Node.js/Express Backend
│   ├── server.js       # Main server file
│   ├── package.json    # Backend dependencies
│   ├── .env            # Backend env config
│   └── .env.example    # Example env template
│
├── .git/               # Git repository
└── README.md           # This file
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Language**: JavaScript/React
- **HTTP Client**: Axios
- **Styling**: CSS (can be extended with Tailwind/SCSS)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Auth**: JWT (jsonwebtoken)
- **Security**: bcryptjs, CORS

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- Git

### 1️⃣ Clone & Initial Setup

```bash
cd jobify
git branch -M main
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

**Configure MongoDB Atlas:**
1. Create a cluster on MongoDB Atlas
2. Get your connection string
3. Update `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobify?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

**Start Backend:**
```bash
npm run dev    # Development mode with nodemon
# or
npm start      # Production mode
```

Backend will run on: `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

**Backend is already configured in `.env.local`:**
```
VITE_API_URL=http://localhost:5000/api
```

**Start Frontend:**
```bash
npm run dev
```

Frontend will run on: `http://localhost:3000`

## ✅ Verification

### Test Backend API
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "Backend is running ✅",
  "timestamp": "2026-03-31T..."
}
```

### Test Frontend Connection
Open `http://localhost:3000` in browser
- You should see "✅ Backend connected"
- API URL displayed
- Jobs section visible

## 🌳 Git Branching Strategy

### Main Branches
- `main` - Production ready code
- `develop` - Integration branch for features

### Feature Branches
Format: `feature/feature-name`
```bash
git checkout -b feature/user-authentication
git checkout -b feature/job-listing
```

### Bug Fix Branches
Format: `bugfix/bug-name`
```bash
git checkout -b bugfix/api-error-handling
```

### Workflow Example
```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/user-auth

# Make changes
git add .
git commit -m "feat: user authentication"

# Push and create PR
git push origin feature/user-auth
# Create Pull Request on GitHub/GitLab
```

## 📁 Directory Structure (Future)

```
server/
├── config/             # Configuration files
├── models/             # Database models (Mongoose)
├── routes/             # API routes
├── controllers/        # Route handlers
├── middleware/         # Custom middleware
├── utils/              # Utility functions
└── server.js           # Entry point

client/
├── src/                # React pages/components
├── components/         # Reusable components
├── public/             # Static assets
├── styles/             # CSS/SCSS
├── utils/              # Helper functions
└── lib/                # Library code
```

## 🚀 Running Both Services

### Option 1: Separate Terminals
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

### Option 2: Use npm-run-all (Optional)
Install in root:
```bash
npm install -g npm-run-all
```

Create root `package.json` with:
```json
{
  "scripts": {
    "dev": "npm-run-all --parallel dev:client dev:server",
    "dev:client": "cd client && npm run dev",
    "dev:server": "cd server && npm run dev"
  }
}
```

Then run: `npm run dev`

## 🔐 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Update MongoDB URI with real credentials
- [ ] Never commit `.env` file
- [ ] Use `.env.example` as template
- [ ] Enable MongoDB IP whitelist
- [ ] Use HTTPS in production
- [ ] Add rate limiting
- [ ] Implement CORS properly

## 📝 API Endpoints (Basic)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check backend status |
| GET | `/api/jobs` | Get all jobs |
| POST | `/api/jobs` | Create new job |

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### MongoDB connection error
- Verify connection string in `.env`
- Check IP whitelist on MongoDB Atlas
- Ensure credentials are correct

### frontend can't connect to backend
- Verify backend is running on port 5000
- Check `VITE_API_URL` in client `.env.local`
- Check browser console for CORS errors

## 📚 Next Steps

1. Set up CI/CD pipeline
2. Add authentication routes
3. Create job models and controllers
4. Build job listing page
5. Add user profile functionality
6. Implement search and filtering
7. Deploy to AWS/Vercel/Render

## 👨‍💻 Development Tips

- Keep API and Frontend development in sync
- Write tests for API endpoints
- Use consistent naming conventions
- Document code changes
- Create proper commit messages
- Use GitHub projects for task tracking

---

Happy coding! 🎉


