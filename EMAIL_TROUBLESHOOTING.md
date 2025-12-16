# Email Troubleshooting Guide

## Issue: Success message shows but email not received

### Step 1: Restart Your Server

**CRITICAL:** After creating/updating `.env.local`, you MUST restart your development server:

```bash
# Stop the server (Press Ctrl+C in the terminal)
# Then restart:
npm run dev
```

Environment variables are only loaded when the server starts!

### Step 2: Check Server Console

After restarting, submit a form and check your **server terminal/console** for:

1. **Success logs:**
   ```
   Attempting to send email...
   From: info@qstudyworld.com
   To: info@qstudyworld.com
   Email sent successfully!
   Message ID: ...
   ```

2. **Error logs:**
   ```
   === EMAIL SEND ERROR ===
   Error code: ...
   Error message: ...
   ```

### Step 3: Verify .env.local Configuration

Your `.env.local` should have:
```env
EMAIL_USER=info@qstudyworld.com
EMAIL_PASSWORD=Flyhigh@2022
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=info@qstudyworld.com
MAIL_FROM_NAME=QStudy World
```

### Step 4: Check Email Spam Folder

Sometimes emails go to spam. Check your **Spam/Junk** folder in your email inbox.

### Step 5: Common Issues

#### Issue: "EAUTH" Error
- **Cause:** Wrong password or username
- **Fix:** Verify `EMAIL_PASSWORD` and `EMAIL_USER` are correct

#### Issue: "ECONNECTION" or "ENOTFOUND" Error
- **Cause:** Wrong SMTP host or server not accessible
- **Fix:** Verify `SMTP_HOST=smtpout.secureserver.net` is correct

#### Issue: No error but no email
- **Cause:** Email might be sent but going to spam, or server not restarted
- **Fix:** 
  1. Restart server
  2. Check spam folder
  3. Check server console for logs

### Step 6: Test Email Configuration

After restarting your server, try submitting a form and:
1. Check the server console for detailed logs
2. Check your email inbox (and spam folder)
3. Share any error messages from the console if email still doesn't arrive

