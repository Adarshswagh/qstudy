# How to Check Server Console Logs

## Important: Check the CORRECT Console

When you submit a form, you need to check the **SERVER console** (where `npm run dev` is running), NOT the browser console.

## Steps:

### 1. Find Your Server Terminal

Look for the terminal/command prompt window where you ran:
```bash
npm run dev
```

This is usually a separate window or tab in your code editor (VS Code, etc.)

### 2. Submit a Form

Fill out and submit any form on your website.

### 3. Look at the Server Terminal

You should see logs like this:

```
=== FORM SUBMISSION API CALLED ===
Timestamp: 2025-12-16T...
Form data received: { formType: 'apply-now', name: '...', email: '...' }
=== CREATING EMAIL TRANSPORTER ===
Creating SMTP transporter...
Host: smtpout.secureserver.net
Port: 465
=== EMAIL CONFIGURATION ===
From: info@qstudyworld.com
To: info@qstudyworld.com
=== ATTEMPTING TO SEND EMAIL ===
=== EMAIL SEND RESULT ===
Status: SUCCESS
Message ID: ...
```

### 4. What to Look For:

**If you see "Email sent successfully!" or "Status: SUCCESS":**
- The email was sent to the SMTP server
- Check your spam folder
- The email might be delayed

**If you see "=== EMAIL SEND ERROR ===":**
- Copy the entire error message
- Share it so we can fix it

**If you see NOTHING:**
- The API might not be getting called
- Check if the server is actually running
- Make sure you're looking at the correct terminal

### 5. Still Not Working?

1. **Restart the server:**
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

2. **Check .env.local exists:**
   - File should be in root directory (same as package.json)
   - Should contain your email credentials

3. **Try submitting again and watch the terminal**

## Share What You See

Please copy and paste:
- All console output from the server terminal
- Any error messages
- Whether you see the "=== FORM SUBMISSION API CALLED ===" message

