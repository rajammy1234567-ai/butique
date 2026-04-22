# 🛍️ Aady's Boutique - Full Stack E-Commerce Platform

A premium, production-ready e-commerce platform for ethnic wear built with MERN stack (MongoDB, Express.js, React, Node.js).

## ✨ Features

### Frontend Features
- **Responsive Design**: Mobile-first responsive UI with Tailwind CSS
- **Product Catalog**: Browse products with filters, search, and categories
- **Shopping Cart**: Add/remove items, manage quantities
- **OTP + Password Authentication**: Secure login/register with phone OTP or email
- **Checkout Flow**: 3-step checkout with Razorpay payment integration
- **Order Tracking**: Real-time order status updates
- **User Dashboard**: View orders, manage addresses, profile settings
- **Admin Dashboard**: Complete admin panel for business management

### Backend Features
- **User Management**: Registration, authentication, profile management
- **Product Management**: CRUD operations for products with variants
- **Order Management**: Order creation, tracking, status management
- **Payment Processing**: Razorpay integration with signature verification
- **Admin Functions**: User management, analytics, order management
- **Security**: JWT authentication, password hashing, input validation

### Database Features
- **MongoDB Collections**: User, Product, Order, Category, Banner, Content, Payment
- **Schema Validation**: Mongoose schemas with proper validation
- **Relationship Mapping**: Proper references between collections

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Razorpay account
- npm or yarn

### Step 1: Clone & Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your credentials:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aadys_boutique
JWT_SECRET=your_super_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

Start backend:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Step 2: Setup Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_key_id
```

Start frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📁 Project Structure

```
aadys-boutique/
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── middleware/          # Auth middleware
│   ├── config/              # Configuration files
│   ├── server.js            # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/           # Page components
    │   ├── components/      # Reusable components
    │   ├── context/         # Auth & Cart context
    │   ├── utils/           # Helper functions
    │   ├── App.jsx          # Main app component
    │   └── index.css        # Global styles
    └── package.json
```

## 🔐 Key Credentials

### Admin Login
The first user created will be automatically set as admin. Or update manually in MongoDB:
```javascript
db.users.updateOne({email: "admin@email.com"}, {$set: {isAdmin: true}})
```

### Contact Information  
- **Phone**: +91-9029411841
- **Email**: nazaqatsuits1313@gmail.com

## 💳 Payment Integration (Razorpay)

1. Create Razorpay account at [razorpay.com](https://razorpay.com)
2. Get API keys from dashboard (test mode for development)
3. Add credentials to backend `.env`
4. Payment verification is automatic using Razorpay signature

## 📊 Admin Panel Features

Access admin dashboard at `/admin/dashboard` (requires admin user)

### Analytics Dashboard
- Total orders, revenue, users, products
- Order status breakdown
- Recent orders

### Order Management
- View all orders with filters
- Update order status (placed → confirmed → shipped → delivered)
- Track delivery with notes and tracking number
- View customer details

### Product Management
- Add/Edit/Delete products
- Manage product variants (size, color)
- Set stock and category
- Upload product images
- Tag products (trending, bestseller, new, sale)

### User Management
- View all users
- Filter by status (active, inactive, blocked)
- View user order history
- Update user status

## 🛒 User Flow

### Registration & Login
1. User lands on homepage
2. Click "Sign In" or continue as guest
3. **Option A**: Login with OTP
   - Enter phone number
   - Receive 6-digit OTP
   - Verify and login
4. **Option B**: Create account with email & password

### Shopping Flow
1. Browse products by category or search
2. View product details with variants
3. Select size/color and quantity
4. Add to cart
5. Proceed to checkout

### Checkout Flow
1. **Step 1**: Select/add shipping address
2. **Step 2**: Review order summary
3. **Step 3**: Complete payment via Razorpay
4. **Confirmation**: Order placed successfully

### Order Tracking
1. User can view all orders in "My Orders"
2. Each order shows:
   - Order status timeline
   - Shipped items list
   - Estimated delivery date
   - Tracking number

## 🔄 Order Status Flow (Admin)

```
placed → confirmed → processing → shipped → delivered
                  ↓
              cancelled (optional at any point)
```

Admin can update status with delivery notes and tracking number.

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login-otp` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/login` - Login with password
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/trending` - Get trending products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `POST /api/orders/verify-payment` - Verify Razorpay payment
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### Admin
- `GET /admin/dashboard` - Dashboard stats
- `GET /admin/orders` - All orders (with pagination)
- `PUT /admin/orders/:id/status` - Update order status
- `GET /admin/users` - All users
- `GET /admin/users/:id` - User details

## 🎨 UI Features

- **Premium Typography**: Using Playfair Display and Poppins fonts
- **Color Scheme**: Primary (deep pink/red) and Secondary (warm brown)
- **Responsive**: Mobile-first design, works on all devices
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Proper semantic HTML, ARIA labels

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcryptjs for password security
- **Razorpay Signature Verification**: Ensures payment authenticity
- **Input Validation**: Express validator middleware
- **CORS Protection**: Origin verification
- **Protected Routes**: Admin routes require authentication and admin status

## 🚢 Deployment Ready

### Prepare for Production
1. Update environment variables
2. Set `NODE_ENV=production`
3. Enable HTTPS
4. Configure proper CORS origins
5. Set rate limiting
6. Enable database backups

### Deploy Backend
- Heroku: `git push heroku main`
- AWS: EC2 with Node.js
- DigitalOcean: App Platform
- Railway: Simple git push deployment

### Deploy Frontend
- Vercel: Built for Next.js/Vite
- Netlify: Perfect for React apps
- AWS S3 + CloudFront
- GitHub Pages

## 📚 Additional Resources

- **MongoDB Atlas**: [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- **Razorpay**: [razorpay.com](https://razorpay.com)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **React Router**: [reactrouter.com](https://reactrouter.com)

## 🤝 Support

- **Phone**: +91-9029411841
- **Email**: nazaqatsuits1313@gmail.com
- **WhatsApp**: Available for queries

## 📝 License

All rights reserved © 2024 Aady's Boutique

---

**Built with ❤️ for fashion lovers** 👗
