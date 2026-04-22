# 🔧 Image Upload Troubleshooting Guide

## ❌ Error: "Upload failed"

This guide will help you fix the upload issue step by step.

---

## 🎯 Common Causes & Solutions

### Issue #1: Upload Preset Doesn't Exist

**Symptoms:**
- Error: "Upload failed"
- Browser console shows: `preset_not_found` or similar

**Fix:**
1. Go to: **https://console.cloudinary.com/**
2. Click **Settings** (⚙️ at bottom left)
3. Click **Upload** tab
4. Check if `unsigned_preset` exists
5. If NOT, click **"+ Add upload preset"**
6. Name: `unsigned_preset`
7. **IMPORTANT:** Toggle **"Unsigned"** to ON (you'll see green toggle)
8. Click **Save**

---

### Issue #2: Upload Preset Not Set to "Unsigned"

**Symptoms:**
- Error appears after preset creation
- Preset exists but upload fails

**Fix:**
1. Go to **Settings → Upload**
2. Find `unsigned_preset` in the list
3. Click to edit it
4. Make sure **"Unsigned"** toggle is **GREEN (ON)**
5. Save changes

**Screenshot clue:** Look for this toggle:
```
Unsigned: [● ON]  ← Should look like this
```

---

### Issue #3: Wrong Cloud Name

**Symptoms:**
- Error immediately when clicking upload
- Browser shows network error

**Verify:**
1. Your cloud name in code: `dhjnveoxf` ✓ (correct)
2. Go to **https://console.cloudinary.com/**
3. Look at top of dashboard
4. Your cloud name shows there
5. Should match `dhjnveoxf`

---

## 🐛 Debugging Steps

### Step 1: Check Browser Console
1. Open your browser
2. Press **F12** (or right-click → Inspect)
3. Go to **Console** tab
4. Try uploading an image
5. Look for detailed error message

**The console will now show:**
```
Starting upload: {
  cloudName: "dhjnveoxf",
  preset: "unsigned_preset",
  fileName: "image.jpg",
  fileSize: 256000
}
```

And either:
```
✅ Upload successful: https://res.cloudinary.com/...
```
or
```
❌ Cloudinary error response: {error: {message: "..."}}
```

### Step 2: Try Different Image

1. Try uploading a **small image** (< 1MB)
2. Try a **JPG** file specifically
3. If that works, issue was with file size/format

### Step 3: Verify Upload Preset Settings

Go to https://console.cloudinary.com/:
1. **Settings → Upload**
2. Find your preset in the list
3. Click it (should show details)
4. Verify these settings:
   - ✅ **Unsigned:** ON (toggle is green)
   - ✅ **Allowed file types:** images (should be default)
   - ✅ **Eager transformations:** can be empty

### Step 4: Test with curl (Advanced)

If above doesn't work, test directly:

```bash
curl -X POST https://api.cloudinary.com/v1_1/dhjnveoxf/image/upload \
  -F "file=@/path/to/image.jpg" \
  -F "upload_preset=unsigned_preset"
```

---

## 📋 Complete Checklist

Before trying upload again:

- [ ] Cloudinary account created and verified
- [ ] Cloud name verified as `dhjnveoxf`
- [ ] Upload preset `unsigned_preset` created
- [ ] Upload preset **Unsigned** toggle is **GREEN**
- [ ] imageUpload.js has correct cloud name
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Both servers restarted

---

## 🚀 If Still Not Working

Try this exact setup:

### Create NEW Upload Preset

1. Go to https://console.cloudinary.com/
2. **Settings → Upload**
3. Click **"+ Add upload preset"**
4. Fill exactly:
   - **Name:** `test_upload`
   - **Unsigned:** Toggle to ON
   - Click **Save**

### Update Code

Edit: `src/utils/imageUpload.js`

Change line 5 to:
```javascript
const CLOUDINARY_UPLOAD_PRESET = 'test_upload';
```

Then try uploading again.

---

## ✅ What Success Looks Like

When working correctly:

1. Click upload area
2. Select image
3. See: "⏳ Uploading..."
4. After 2-5 seconds: Image preview appears ✅
5. Browser console shows: "Upload successful: https://res.cloudinary.com/..."

---

## 📞 Still Stuck?

Get more details from console:

1. **F12** → **Console tab**
2. Try uploading
3. **Copy the full error message**
4. Share that error - it will have specifics!

**Common console errors:**
- `"preset_not_found"` → Preset doesn't exist
- `"invalid_file"` → File format issue
- `"CORS error"` → Rare, usually browser issue
- `"401 Unauthorized"` → Cloud name wrong

---

## 💡 Pro Tips

✅ **Start simple:** Use a small JPG file (< 500KB)  
✅ **Check console:** Browser F12 → Console shows exact error  
✅ **Verify preset:** Go to dashboard and double-check  
✅ **Clear cache:** Ctrl+Shift+Delete → Clear browser cache  
✅ **Restart servers:** Stop and restart both frontend & backend  

---

## 🎯 Next Steps

1. Open https://console.cloudinary.com/
2. Go to Settings → Upload
3. Verify `unsigned_preset` exists and Unsigned=ON
4. Clear browser cache
5. Try uploading again
6. Check console (F12 → Console) for error details
7. Share the console error if still not working!
