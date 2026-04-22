# 🚀 Aady's Boutique - Setup & Installation Guide

## ⚠️ Prerequisites

Before starting, ensure you have:

- **Node.js** v14 or higher ([Download](https://nodejs.org))
- **npm** or **yarn** (comes with Node.js)
- **MongoDB Atlas** account (free tier available)
- **Razorpay** account (for payments)

## 📋 Step-by-Step Setup

### Part 1: MongoDB Atlas Setup (Database)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/aadys_boutique`

### Part 2: Razorpay Setup (Payments)

1. Go to [razorpay.com](https://razorpay.com)
2. Create account
3. Go to Dashboard → Settings → API Keys
4. Copy Key ID and Key Secret (Test Mode)

### Part 3: Backend Setup

```bash
# Navigate to backend directory
cd aadys-boutique/backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

Edit `.env` file with your credentials:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/aadys_boutique?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

FRONTEND_URL=http://localhost:5173
ADMIN_PHONE=9029411841
```

**Start Backend Server:**

```bash
npm run dev
```

Expected output:
```
✅ MongoDB Connected: cluster0.mongodb.net
🚀 Server is running on port 5000
```

### Part 4: Frontend Setup

```bash
# Open new terminal, navigate to frontend
cd aadys-boutique/frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

Edit `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

**Start Frontend Server:**

```bash
npm run dev
```

Expected output:
```
VITE v4.1.0  ready in 234 ms
➜  Local:   http://localhost:5173/
```

## ✅ Verify Installation

1. **Backend**: Open http://localhost:5000/health
   - Should return: `{"success":true,"message":"Server is running"}`

2. **Frontend**: Open http://localhost:5173
   - Should see Aady's Boutique homepage

3. **Database**: Check MongoDB Atlas
   - Collections created automatically on first API call

## 🧪 Test the Application

### Create First User (Registration)

1. Click "Sign In" on homepage
2. Go to "Register" tab
3. Fill details:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Password: password123

4. Click "Create Account"

### Test OTP Login

1. Click "Sign In"
2. Go to "OTP Login" tab
3. Enter phone: 9876543210
4. Check console (terminal) for OTP
5. Copy OTP and paste in field
6. Login successful!

### Make First Admin (Required)

1. Go to MongoDB Atlas
2. Find your database
3. Go to Collections → Users
4. Find your user document
5. Edit: Add field `isAdmin: true`

Or use MongoDB shell:
```javascript
db.users.updateOne(
  {email: "test@example.com"}, 
  {$set: {isAdmin: true}}
)
```

### Create Test Product

1. Login as admin user
2. Go to http://localhost:5173/admin/dashboard
3. Click "Manage Products"
4. Click "Add Product"
5. Fill in:
   - Name: Test Suit
   - Price: 2999
   - Stock: 50
   - Description: Premium ethnic wear
   - Category: (you'll need to create first)

### Create Test Category

Use MongoDB to add manually:
```javascript
db.categories.insertOne({
  name: "Suits",
  slug: "suits",
  description: "Beautiful ethnic suits",
  isActive: true
})
```

Copy the `_id` and use it for product category.

### Test Payment (Razorpay)

1. Add products to cart
2. Go to checkout
3. Fill shipping address
4. Click "Proceed to Payment"
5. Use Razorpay test card:
   - Card: 4111 1111 1111 1111
   - Expiry: 12/25
   - CVV: 123
6. Payment will be successful in test mode

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:**
- Check connection string in `.env`
- Ensure IP whitelist includes your IP (MongoDB Atlas Dashboard)
- Verify username/password are URL-encoded if special characters

### Issue: CORS Error
**Solution:**
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Check browser console for exact error
- Try with Postman to test API directly

### Issue: Razorpay Payment Not Working
**Solution:**
- Verify API keys are from TEST mode, not Production
- Check `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are correct
- Use test card numbers provided by Razorpay

### Issue: Port Already in Use
**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

### Issue: Module Not Found
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Testing Credentials

### Test User
- Email: test@example.com
- Phone: 9876543210
- Password: password123

### Admin User
- Same as Test User (with isAdmin: true)

### Test Card (Razorpay)
- Card: 4111 1111 1111 1111
- Expiry: 12/25
- CVV: 123
- Result: Success ✓

## 🎯 Next Steps

1. **Customize Brand**: Update logo, colors in Tailwind config
2. **Add More Products**: Create categories then products
3. **Setup Email**: Integrate Nodemailer for order emails
4. **Add Images**: Use Cloudinary for image uploads
5. **Deploy**: Push to production servers

## 📚 Useful Commands

```bash
# Backend
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run tests (if configured)

# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🆘 Getting Help

1. Check the main README.md
2. Review API.md for endpoint details
3. Check console/terminal for error messages
4. Contact support: +91-9029411841

## ✨ Ready to Go!

Your Aady's Boutique platform is now ready! 

🎉 Start building your fashion empire! 👗👔

---

**Remember**: Always keep API keys secure. Never commit `.env` files to version control!
