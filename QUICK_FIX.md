# Quick Fix for Email Not Sending

## What to Check:

### 1. **Check Your Server Console/Terminal**

When you submit a form, look at the terminal where `npm run dev` is running. You should see logs like:

```
=== EMAIL CONFIGURATION ===
From: info@qstudyworld.com
To: info@qstudyworld.com
SMTP Host: smtpout.secureserver.net
SMTP Port: 465
===========================
```

**If you see error messages, copy them and share them.**

### 2. **Common Errors and Fixes:**

#### Error: "EAUTH" or "Invalid login"
- **Fix:** Check that `EMAIL_PASSWORD=Flyhigh@2022` is correct in `.env.local`
- Make sure there are no extra spaces

#### Error: "ECONNECTION" or "ENOTFOUND"
- **Fix:** Try changing port from 465 to 587
- Update `.env.local`:
  ```
  SMTP_PORT=587
  SMTP_SECURE=false
  SMTP_ENCRYPTION=tls
  ```

#### Error: "ETIMEDOUT"
- **Fix:** The server might be blocking the connection
- Try port 587 with TLS instead

### 3. **Try Alternative Configuration**

If port 465 (SSL) doesn't work, try port 587 (TLS):

Update your `.env.local`:
```env
EMAIL_USER=info@qstudyworld.com
EMAIL_PASSWORD=Flyhigh@2022
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_ENCRYPTION=tls
MAIL_FROM_ADDRESS=info@qstudyworld.com
MAIL_FROM_NAME=QStudy World
```

Then **restart your server**.

### 4. **Verify .env.local Location**

Make sure `.env.local` is in the **root directory** (same folder as `package.json`), not in a subfolder.

### 5. **Check Email Spam Folder**

Sometimes emails are sent but go to spam. Check your spam/junk folder in `info@qstudyworld.com`.

## Next Steps:

1. **Submit a form**
2. **Check the server console** for error messages
3. **Share the error messages** you see (if any)
4. **Check your email spam folder**

The detailed logs will help identify the exact issue!

