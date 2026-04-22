# 📡 API Reference - Aady's Boutique

## Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-domain.com/api`

## Authentication
All protected endpoints require JWT token in header:
```
Authorization: Bearer {token}
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "isAdmin": false
  },
  "token": "jwt_token_here"
}
```

### Send OTP
**POST** `/auth/login-otp`

Request:
```json
{
  "phone": "9876543210"
}
```

Response:
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "otp": "123456"
}
```

### Verify OTP & Login
**POST** `/auth/verify-otp`

Request:
```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

### Login with Password
**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
**GET** `/auth/me` (Protected)

Response:
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "isAdmin": false,
    "addresses": [],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Update Profile
**PUT** `/auth/profile` (Protected)

Request:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "addresses": [...]
}
```

### Add Address
**POST** `/auth/address` (Protected)

Request:
```json
{
  "street": "123 Main Street",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "phone": "9876543210",
  "isDefault": true
}
```

---

## 🛍️ Product Endpoints

### Get All Products
**GET** `/products`

Query Parameters:
- `category` - Filter by category ID
- `tag` - Filter by tag (trending, bestseller, new, sale)
- `search` - Search by name
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)

Response:
```json
{
  "success": true,
  "products": [
    {
      "id": "product_id",
      "name": "Premium Suit",
      "description": "Beautiful ethnic suit",
      "price": 2999,
      "category": {...},
      "images": [...],
      "variants": [...],
      "stock": 50,
      "tags": ["trending"],
      "rating": 4.5
    }
  ],
  "pagination": {
    "total": 100,
    "pages": 9,
    "currentPage": 1
  }
}
```

### Get Trending Products
**GET** `/products/trending`

### Get Single Product
**GET** `/products/:id`

### Create Product (Admin)
**POST** `/products` (Protected, Admin only)

Request:
```json
{
  "name": "Premium Suit",
  "description": "Beautiful ethnic suit",
  "price": 2999,
  "category": "category_id",
  "stock": 50,
  "images": [
    {"url": "image_url", "alt": "Product image"}
  ],
  "variants": [
    {"size": "S", "color": "Red", "stock": 10},
    {"size": "M", "color": "Blue", "stock": 20}
  ],
  "tags": ["trending", "bestseller"]
}
```

### Update Product (Admin)
**PUT** `/products/:id` (Protected, Admin only)

### Delete Product (Admin)
**DELETE** `/products/:id` (Protected, Admin only)

---

## 🏪 Category Endpoints

### Get All Categories
**GET** `/categories`

Response:
```json
{
  "success": true,
  "categories": [
    {
      "id": "cat_id",
      "name": "Suits",
      "slug": "suits",
      "description": "All types of suits",
      "image": "url",
      "icon": "👗",
      "position": 0,
      "isActive": true
    }
  ]
}
```

### Create Category (Admin)
**POST** `/categories` (Protected, Admin only)

Request:
```json
{
  "name": "Sarees",
  "slug": "sarees",
  "description": "Traditional sarees",
  "image": "image_url"
}
```

---

## 📦 Order Endpoints

### Create Order
**POST** `/orders` (Protected)

Request:
```json
{
  "items": [
    {
      "productId": "product_id",
      "productName": "Premium Suit",
      "quantity": 2,
      "price": 2999,
      "variant": {"size": "M", "color": "Red"},
      "image": "image_url"
    }
  ],
  "totalAmount": 5998,
  "shippingAddress": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {...},
  "razorpayOrderId": "order_id",
  "razorpayKeyId": "key_id"
}
```

### Verify Payment
**POST** `/orders/verify-payment` (Protected)

Request:
```json
{
  "razorpay_payment_id": "pay_xxx",
  "razorpay_order_id": "order_xxx",
  "razorpay_signature": "signature_xxx",
  "orderId": "ORD-xxx"
}
```

### Get User Orders
**GET** `/orders` (Protected)

### Get Order Details
**GET** `/orders/:id` (Protected)

### Cancel Order
**PUT** `/orders/:id/cancel` (Protected)

Request:
```json
{
  "reason": "Changed my mind"
}
```

---

## 👨‍💼 Admin Endpoints

### Dashboard Stats
**GET** `/admin/dashboard` (Protected, Admin only)

Response:
```json
{
  "success": true,
  "stats": {
    "totalOrders": 150,
    "totalRevenue": 450000,
    "totalUsers": 300,
    "totalProducts": 50,
    "pendingOrders": 5,
    "confirmedOrders": 20,
    "shippedOrders": 30,
    "deliveredOrders": 95,
    "recentOrders": [...]
  }
}
```

### Get All Orders
**GET** `/admin/orders` (Protected, Admin only)

Query Parameters:
- `status` - Filter by order status
- `paymentStatus` - Filter by payment status
- `page` - Page number
- `limit` - Items per page

### Update Order Status
**PUT** `/admin/orders/:id/status` (Protected, Admin only)

Request:
```json
{
  "status": "shipped",
  "notes": "Package shipped",
  "trackingNumber": "TRACK123",
  "estimatedDelivery": "2024-01-20T00:00:00Z"
}
```

### Get All Users
**GET** `/admin/users` (Protected, Admin only)

Query Parameters:
- `status` - Filter by status (active, inactive, blocked)
- `page` - Page number
- `limit` - Items per page

### Get User Details
**GET** `/admin/users/:id` (Protected, Admin only)

Response:
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "addresses": [...],
    "orderCount": 5,
    "totalSpent": 15000
  }
}
```

### Update User Status
**PUT** `/admin/users/:id/status` (Protected, Admin only)

Request:
```json
{
  "status": "blocked"
}
```

---

## ⚠️ Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Access token required"
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details"
}
```

---

## 🧪 Testing with Postman

1. Import the API collection
2. Set environment variables:
   - `base_url` = `http://localhost:5000/api`
   - `token` = JWT token from login
3. Test endpoints in order

---

## 📝 Request Headers

```
Content-Type: application/json
Authorization: Bearer {token}
```

---

## 🔄 Pagination

List endpoints support pagination:

Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

Response includes:
```json
{
  "pagination": {
    "total": 100,
    "pages": 5,
    "currentPage": 1
  }
}
```

---

## Useful Tips

1. **Token expires in**: 30 days
2. **OTP valid for**: 10 minutes
3. **Rate Limiting**: Coming soon
4. **Webhooks**: For order status updates (planned)

---

For more details, refer to controller files in `backend/controllers/`
