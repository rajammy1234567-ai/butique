# 🚀 Implementation Guide - Aady's Boutique

## 📝 Overview

This guide walks you through executing your complete e-commerce platform. All code files are ready - this guide helps you:
1. Setup local development environment
2. Configure required services
3. Test all features
4. Deploy to production

---

## Phase 1: Pre-Launch Setup (Before Running Code)

### Step 1: Install Required Software

#### Windows
```bash
# 1. Node.js (includes npm)
# Download from https://nodejs.org/ (LTS version)
# Verify installation
node --version
npm --version

# 2. Git
# Download from https://git-scm.com/
# Verify installation
git --version

# 3. MongoDB (Choose one)
# Option A: MongoDB Community Edition (local)
# Download from https://www.mongodb.com/try/download/community

# Option B: MongoDB Atlas (cloud - RECOMMENDED)
# Go to https://www.mongodb.com/cloud/atlas
# Create free account, create cluster
```

### Step 2: Setup MongoDB Atlas (Cloud Database)

```bash
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new cluster (free tier)
4. Create database user (name: admin, password: your_secure_password)
5. Whitelist IP (0.0.0.0/0 for development)
6. Copy connection string:
   mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/aadys_boutique?retryWrites=true&w=majority
7. Replace PASSWORD with your actual password
```

### Step 3: Setup Razorpay Account

```bash
1. Go to https://dashboard.razorpay.com/
2. Sign up for free account
3. Complete email verification
4. Go to Settings → API Keys
5. Copy TEST mode keys:
   - Key ID: razorpay_key_xxxxx
   - Key Secret: xxxxxxxxxxxxxxxx
6. Save these - you'll need them for .env
```

### Step 4: Create Project Folders

```bash
# Create main project directory
mkdir aadys-boutique
cd aadys-boutique

# Create backend and frontend folders
mkdir backend frontend

# Navigate to backend and create structure
cd backend
mkdir models controllers middleware routes config
mkdir config

cd ..
cd frontend
mkdir src
mkdir src/pages
mkdir src/pages/Admin
mkdir src/components
mkdir src/context
mkdir src/utils

cd ../..
```

---

## Phase 2: Backend Setup

### Step 1: Initialize Backend

```bash
cd backend

# Create package.json
npm init -y

# Install dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken razorpay axios
npm install --save-dev nodemon

# Verify installations
npm list
```

### Step 2: Create .env File

```bash
# Create file: backend/.env

PORT=5000
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aadys_boutique?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
JWT_EXPIRY=30d
RAZORPAY_KEY_ID=razorpay_key_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
ADMIN_EMAIL=nazaqatsuits1313@gmail.com
ADMIN_PHONE=9029411841
NODE_ENV=development
```

### Step 3: Verify Backend Configuration

```bash
# Test connection
node -e "const mongoose = require('mongoose'); console.log('MongoDB client ready')"

# Should output: MongoDB client ready
```

### Step 4: Update package.json Scripts

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js",
  "test": "echo \"Error: no test specified\""
}
```

### Step 5: Start Backend Server

```bash
npm run dev

# Expected output:
# Server running on http://localhost:5000
# Database connected successfully
```

### Step 6: Test Backend

```bash
# Open new terminal, test API
curl http://localhost:5000/health

# Expected response:
# {"message":"Server is running"}
```

---

## Phase 3: Frontend Setup

### Step 1: Initialize Frontend

```bash
cd frontend

# Create package.json
npm init -y

# Install dependencies
npm install react react-dom react-router-dom axios
npm install -D vite @vitejs/plugin-react
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react

# Verify
npm list
```

### Step 2: Create .env File

```bash
# Create file: frontend/.env

VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=razorpay_key_test_xxxxx
```

### Step 3: Update package.json Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### Step 4: Start Frontend Server

```bash
npm run dev

# Expected output:
# VITE v4.x.x ready in xxx ms
# ➜ Local: http://localhost:5173/
# ➜ press h to show help
```

### Step 5: Verify Frontend

```bash
# Open browser and go to: http://localhost:5173
# You should see the homepage
```

---

## Phase 4: Initial Testing

### Test 1: User Registration

```bash
# Backend should show connection to MongoDB
# Frontend homepage loads

# Test Registration Flow:
1. Click on account icon (top right)
2. Select "Sign Up"
3. Fill: Name, Email, Phone, Address
4. Create password
5. Click Sign Up

# Expected: Success message, redirect to home
```

### Test 2: User Login

```bash
# After registration
1. Click on account icon
2. Select "Log In"
3. Choose login method:
   - Email/Password (immediate)
   - Phone/OTP (needs SMS setup)
4. Enter credentials
5. Click Log In

# Expected: Login successful, user menu shows name
```

### Test 3: Browse Products

```bash
# Note: No products yet - will create in next step

1. Click "Shop" in navbar
2. Should see empty product listing

# This is expected - you haven't added products yet
```

### Test 4: Admin Access

```bash
1. Register as admin user (you'll enable admin manually)
2. Update in MongoDB: db.users.updateOne({email: "admin@example.com"}, {$set: {isAdmin: true}})
3. Logout then login
4. Click account icon
5. Should see "Admin Dashboard" option
```

---

## Phase 5: Create Admin User

### Option A: Via MongoDB Compass (Easiest)

```bash
1. Download MongoDB Compass
2. Connect with your Atlas connection string
3. Select database: aadys_boutique
4. Select collection: users
5. Find the user you want to make admin
6. Edit document: isAdmin: true (change from false to true)
7. Save
```

### Option B: Via mongo Command

```bash
# Connect to MongoDB Atlas
mongosh "mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/aadys_boutique"

# Find your user
db.users.findOne({email: "your@email.com"})

# Update to admin
db.users.updateOne(
  {email: "your@email.com"},
  {$set: {isAdmin: true}}
)

# Verify
db.users.findOne({email: "your@email.com"})
# Should show isAdmin: true
```

---

## Phase 6: Add Test Data

### Add Categories

```bash
# Using MongoDB Compass or mongosh

db.categories.insertMany([
  {name: "Sarees", slug: "sarees", description: "Ethnic sarees collection"},
  {name: "Kurtas", slug: "kurtas", description: "Traditional kurtas"},
  {name: "Dupattas", slug: "dupattas", description: "Silk dupattas"},
  {name: "Jewelry", slug: "jewelry", description: "Traditional jewelry"}
])
```

### Add Products

```bash
db.products.insertMany([
  {
    name: "Silk Saree - Red",
    description: "Beautiful red silk saree with golden border",
    price: 5000,
    category: ObjectId("category_id_here"),
    images: ["https://via.placeholder.com/500"],
    stock: 10,
    variants: [
      {size: "6 yards", color: "Red", stock: 10}
    ],
    tags: ["bestseller", "trending"]
  },
  {
    name: "Cotton Kurta",
    description: "Comfortable cotton kurta for daily wear",
    price: 1500,
    category: ObjectId("category_id_here"),
    images: ["https://via.placeholder.com/500"],
    stock: 15,
    variants: [
      {size: "S", color: "Blue", stock: 5},
      {size: "M", color: "Blue", stock: 5},
      {size: "L", color: "Blue", stock: 5}
    ]
  }
])
```

### Add Banners

```bash
db.banners.insertMany([
  {
    title: "Winter Collection",
    description: "50% off on winter wear",
    image: "https://via.placeholder.com/1200x400",
    link: "/shop",
    position: 1,
    isActive: true,
    bannerType: "hero"
  }
])
```

---

## Phase 7: Test Complete Flow

### Payment Flow Test

```bash
# Use Razorpay Test Card (won't charge you)
Card Number: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123

Test Flow:
1. Login as normal user
2. Add product to cart
3. Go to cart
4. Click checkout
5. Fill/select address
6. Click "Pay with Razorpay"
7. Enter test card details above
8. Complete payment
9. Order should appear in "My Orders"
10. Check admin panel to see order
```

### Admin Panel Test

```bash
1. Login as admin
2. Click account > Admin Dashboard
3. Should see:
   - Dashboard stats (orders, revenue, users)
   - Order breakdown
   - Recent orders
4. Click "Orders" to manage all orders
5. Should be able to:
   - View all orders
   - Update order status
   - Filter by status
```

---

## Phase 8: Customization

### Change Brand Colors

**File**: `frontend/tailwind.config.js`

```javascript
// Change from current colors
primary: {
  50: '#fdf2f6',
  // ... change hex values to your brand colors
}
// Example: Change to blue theme
primary: '#0066ff'
secondary: '#003d99'
```

### Change Company Details

**Files to update**:
1. `frontend/src/components/Footer.jsx` - Update phone, email, address
2. `backend/.env` - Update admin email and phone
3. `frontend/src/pages/Home.jsx` - Update company info

### Add Your Logo

**File**: `frontend/src/components/Navbar.jsx`

```javascript
// Replace text logo with image
<img src="/logo.png" alt="Aady's Boutique" className="h-8" />
```

### Update Domain

**File**: `frontend/vite.config.js`

```javascript
// Add your production domain
server: {
  proxy: {
    '/api': {
      target: 'https://your-backend-domain.com',  // Change this
      changeOrigin: true
    }
  }
}
```

---

## Phase 9: Deployment

### Deploy Backend to Heroku

```bash
# 1. Install Heroku CLI
npm install -g heroku

# 2. Login to Heroku
heroku login

# 3. Create Heroku app
heroku create your-app-name

# 4. Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set RAZORPAY_KEY_ID=your_key
heroku config:set RAZORPAY_KEY_SECRET=your_secret

# 5. Deploy
git push heroku main

# 6. View logs
heroku logs --tail
```

### Deploy Frontend to Vercel

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
cd frontend
vercel

# 4. Update .env.production
VITE_API_URL=https://your-backend-domain.com/api

# 5. Redeploy
vercel --prod
```

---

## Phase 10: Post-Launch

### Monitoring

```bash
# Backend logs
heroku logs --tail

# Frontend errors
Check browser console (F12)

# Database
MongoDB Atlas dashboard → collection monitoring

# Payments
Razorpay dashboard → Transactions
```

### Maintenance

```bash
# Daily:
- Check for failed orders
- Monitor payment errors

# Weekly:
- Review user activity
- Check server logs
- Backup database

# Monthly:
- Update dependencies
- Security audit
- Performance review
```

---

## Troubleshooting

### Issue: Backend won't start

```bash
# Check error:
1. Verify Node.js version: node --version (need 14+)
2. Check port 5000 is free: netstat -an | grep 5000
3. Check MongoDB connection string in .env
4. Check JWT_SECRET is set
5. Look at error message carefully
```

### Issue: Frontend won't load

```bash
# Check
1. Backend is running (curl http://localhost:5000)
2. .env is configured correctly
3. All dependencies installed (npm install)
4. Port 5173 is free
```

### Issue: Payment fails

```bash
# Check
1. Razorpay keys are correct in .env
2. Using test keys (not production)
3. Using test card (4111 1111 1111 1111)
4. Order is created successfully in MongoDB
```

### Issue: Login fails

```bash
# Check
1. MongoDB is connected
2. User exists in database
3. Password is correct
4. OTP setup is not configured (use password login)
```

---

## Performance Tips

### Backend
```bash
# Enable caching
# Add Redis for session storage
# Use database indexes
# Implement rate limiting
npm install redis express-rate-limit
```

### Frontend
```bash
# Update images to WebP format
# Lazy load images
# Code splitting
npm run build
# Check build size with: npm install -g source-map-explorer
```

---

## Security Checklist

Before going live:

- [ ] Change JWT_SECRET to strong random string
- [ ] Change Razorpay to production keys
- [ ] Enable HTTPS everywhere
- [ ] Set NODE_ENV=production in backend
- [ ] Add rate limiting to API
- [ ] Enable database backups
- [ ] Setup firewall rules
- [ ] Enable CORS for production domain only
- [ ] Remove console.logs from production code
- [ ] Setup error monitoring (Sentry.io)

---

## Support & Help

### Common Questions

**Q: How do I add more products?**
A: Through admin panel or directly in MongoDB

**Q: How do I change prices?**
A: Edit product in admin panel or MongoDB

**Q: How do I enable SMS for OTP?**
A: Install Twilio, add in authController

**Q: How do I backup database?**
A: MongoDB Atlas → Automated Backups → On by default

**Q: How do I get live payment working?**
A: Switch Razorpay to production mode, use real keys

### Contact

- Email: nazaqatsuits1313@gmail.com
- Phone: +91-9029411841
- Alternate: +91-7402528888

---

## Quick Commands Reference

```bash
# Backend
cd backend
npm install          # First time setup
npm run dev         # Start development
npm start           # Start production

# Frontend
cd frontend
npm install          # First time setup
npm run dev         # Start development
npm run build       # Create production build
npm run preview     # Preview production build

# MongoDB
mongosh "mongodb+srv://..."  # Connect to database
```

---

## Next Steps

1. ✅ Read this guide completely
2. ✅ Setup Node.js and npm
3. ✅ Setup MongoDB Atlas
4. ✅ Setup Razorpay account
5. ✅ Create project folders
6. ✅ Setup backend (.env, install, start)
7. ✅ Setup frontend (.env, install, start)
8. ✅ Test local setup
9. ✅ Create admin user
10. ✅ Add test products
11. ✅ Test complete flow
12. ✅ Customize branding
13. ✅ Deploy to production

---

**Version**: 1.0  
**Last Updated**: January 2024  
**Status**: Complete ✅
