# Admin Panel Setup Instructions

This document explains how to set up the admin panel for your portfolio website.

## Security Implementation

The admin panel has been secured with the following measures:

1. **Authentication Required**: Only logged-in users can access the admin panel
2. **Email Whitelist**: Only specific email addresses can access the admin panel
3. **No Public Registration**: Account creation has been disabled on the login page

Currently authorized admin emails:

- `abrhamasrat29@gmail.com` (your email)
- `admin@yourportfolio.com` (default admin)

## Setting Up Your Admin Account

### Method 1: Using the Utility Script (Recommended)

1. Open your terminal/command prompt
2. Navigate to your project directory:
   ```
   cd d:\Real-project\Portofolio
   ```
3. Run the admin account creation script:
   ```
   node src/utils/createAdmin.js
   ```

This will create an admin account with:

- Email: `abrhamasrat29@gmail.com`
- Password: `SecurePass123!` (change this after first login!)

### Method 2: Manual Creation via Firebase Console

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to "Authentication" > "Users"
4. Click "Add user"
5. Enter your email and a secure password
6. Click "Add user"

## Accessing the Admin Panel

1. Visit `http://localhost:5175/login` (or your deployed URL + `/login`)
2. Enter your admin credentials
3. Click "Sign in"
4. You will be redirected to the admin dashboard

## Adding Additional Admin Users

To add more admin users, you need to update the authorized emails list in two places:

1. In `src/components/ProtectedRoute.jsx`, add the email to the `authorizedAdmins` array:

   ```javascript
   const authorizedAdmins = [
     "admin@yourportfolio.com",
     "abrhamasrat29@gmail.com",
     "newadmin@example.com", // Add new admin email here
   ];
   ```

2. Create the account either through the Firebase Console or by temporarily modifying the utility script.

## Security Recommendations

1. **Change Default Password**: After first login, immediately change your password to something secure
2. **Enable Multi-Factor Authentication**: In Firebase Console, enable MFA for additional security
3. **Regular Audits**: Periodically review the list of authorized admins in Firebase Authentication
4. **Strong Passwords**: Use strong, unique passwords for admin accounts

## Troubleshooting

### "Access Denied" After Login

- Ensure you're using an email from the authorized list
- Check that the email exactly matches (case-sensitive) an entry in the authorized list

### "User Not Found" or "Wrong Password"

- Double-check your email and password
- If you've forgotten your password, you'll need to reset it through Firebase Console

### Need to Add More Admins

- Follow the "Adding Additional Admin Users" section above
- Never give the login credentials to unauthorized individuals

## Removing Access

To revoke someone's admin access:

1. Go to Firebase Console > Authentication > Users
2. Delete the user account
3. They will no longer be able to log in

For any issues or questions, please refer to the main documentation or contact support.
