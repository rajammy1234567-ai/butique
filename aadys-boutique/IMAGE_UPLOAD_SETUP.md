# 📸 Image Upload - Cloudinary Setup Guide

## ✅ What You Can Now Do

Your admin panel now has **full image upload functionality** for:
- ✅ **Product Images** - Upload multiple images per product
- ✅ **Banner Images** - Upload banner background images
- ✅ **Image Preview** - See uploaded images instantly
- ✅ **Remove Images** - Delete images from the form before saving

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Create Free Cloudinary Account

1. Go to: **https://cloudinary.com/users/register/free**
2. Sign up (free account includes 10GB storage)
3. Verify your email
4. Log in to dashboard

### Step 2: Get Your Credentials

After login, go to your **Dashboard**:

- **Cloud Name** - Shown at top (looks like: `dxxx...`)
- **Upload Preset** - Create one (Admin Panel → Upload → Upload Presets → Add)
  - Click **"Create unsigned preset"**
  - Name it: `boutique_upload` (or any name)
  - Save it

### Step 3: Update Frontend Code

Open: `src/utils/imageUpload.js`

Replace these two lines:
```javascript
const CLOUDINARY_CLOUD_NAME = 'demo'; // ← Replace with your cloud name
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_preset'; // ← Replace with your preset name
```

**Example:**
```javascript
const CLOUDINARY_CLOUD_NAME = 'dhukt5yp8';
const CLOUDINARY_UPLOAD_PRESET = 'boutique_upload';
```

---

## 🎯 How to Use

### Adding Product Images

1. Go to: **Admin > Products > Add Product**
2. Scroll to **"📸 Product Images"** section
3. Click the dashed upload box
4. Select image file(s) from your device
5. ⏳ Wait for upload (usually 2-3 seconds)
6. ✅ Image preview appears below
7. Add more images or continue filling form
8. Click **"Create Product"** - images saved automatically!

**Features:**
- ✅ Upload multiple images at once
- ✅ See preview before submitting
- ✅ Hover over image → Click trash to remove
- ✅ Works with: JPG, PNG, WebP, GIF

### Adding Banner Images

1. Go to: **Admin > Banners > Add Banner** (click "+ Add Banner")
2. Fill in: Title, Description, Link
3. Scroll to **"Banner Image"** section
4. Click upload area
5. Select image from device
6. ⏳ Wait for upload
7. ✅ Image preview shows on right
8. Click **"Create Banner"** - done!

**Features:**
- ✅ Upload single banner image
- ✅ See preview instantly
- ✅ Remove and re-upload as needed
- ✅ 10GB free storage

### Editing Existing Products

1. Go to: **Admin > Products**
2. Click Edit (pencil icon)
3. Current images show in preview grid
4. Add more images or remove existing
5. Click **"Update Product"**

---

## 📋 Image Guidelines

### Recommended Sizes
| Type | Size | Format |
|------|------|--------|
| Product | 400×500px | JPG/PNG |
| Banner | 1920×400px | JPG/WebP |
| Thumbnail | 100×100px | JPG |

### File Limits
- **Max per file:** 100MB (free tier)
- **Storage:** 10GB total (free tier)
- **Upload speed:** Usually 2-5 seconds per image

### Supported Formats
✅ JPG, PNG, WebP, GIF, TIFF, HEIC

---

## 🔧 Troubleshooting

### "Upload Failed" Error
**Problem:** Upload doesn't work  
**Solution:**
1. Check internet connection
2. Verify Cloudinary credentials in `imageUpload.js`
3. Ensure upload preset is created and set to "unsigned"
4. Try a smaller image file (< 5MB)

### "Upload Preset Not Found"
**Problem:** Error message about preset  
**Solution:**
1. Go to Cloudinary Dashboard
2. Admin Panel → Upload Presets
3. Create new unsigned preset
4. Copy exact name to code

### Image Not Showing After Upload
**Problem:** Image uploaded but doesn't display  
**Solution:**
1. Check image URL in database
2. Verify image still exists in Cloudinary
3. Try refreshing browser
4. Check if image is marked as private

### Slow Upload Speed
**Problem:** Taking too long to upload  
**Solution:**
1. Compress image first (use online tool)
2. Use PNG instead of high-quality JPG
3. Check internet connection
4. Split into multiple files

---

## 💾 Image Storage

### Where Images Are Stored
✅ **Cloudinary Cloud** - Not on your server (no storage needed!)
✅ **Fast CDN** - Images served globally at high speed
✅ **Automatic Optimization** - Images resize for different devices

### How Long Stored
- **Free tier:** Images stored indefinitely (as long as account active)
- **Deleted:** Only when you delete from admin or Cloudinary
- **Always accessible:** Via the URL saved in database

---

## 🔐 Security Notes

**What's Secure:**
- ✅ Unsigned uploads (no secret key shared with frontend)
- ✅ Cloudinary validates upload
- ✅ Images behind CDN
- ✅ HTTPS encrypted

**Best Practice:**
- Only share upload preset (not secret key)
- Preset is public - can be used from frontend
- Not recommended for large-scale (1M+ users)

---

## 📚 Advanced Options (Optional)

### Auto Image Optimization
After upload, images automatically:
- ✅ Converted to WebP (smaller file size)
- ✅ Resized for mobile devices
- ✅ Served via CDN for fast loading

### Image Transformations
You can modify URLs for effects:
```
https://res.cloudinary.com/cloud_name/image/upload/w_400,h_500,c_fill/image.jpg
```
- `w_400` = Width 400px
- `h_500` = Height 500px
- `c_fill` = Crop to fill

---

## 🎓 Next Steps

1. ✅ Create Cloudinary account (2 min)
2. ✅ Get Cloud Name & Create Preset (3 min)
3. ✅ Update `imageUpload.js` file (1 min)
4. ✅ Test upload on Add Product page (2 min)
5. ✅ You're done! Start uploading images! 🎉

---

## 📞 Need Help?

**Cloudinary Docs:** https://cloudinary.com/documentation  
**Upload Presets Guide:** https://cloudinary.com/documentation/upload_presets

**Still Issues?**
1. Check console for error messages (F12 → Console tab)
2. Verify credentials in `imageUpload.js` exactly match Cloudinary
3. Ensure upload preset is "unsigned"
4. Try different browser or incognito mode

---

## ✨ Features Coming Next (Optional)

- [ ] Drag & drop image upload
- [ ] Image cropping tool
- [ ] Batch upload
- [ ] Image gallery lightbox
- [ ] Auto image compression
- [ ] Watermark support

**Your image upload is ready to go!** 🚀
