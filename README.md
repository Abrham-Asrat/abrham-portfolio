Here is the README as a plain Markdown code block. Just click the copy button in the top-right corner of the code block and paste it directly into your README.md file.

```markdown
# Abrham Asrat — Full-Stack Web Developer Portfolio

Welcome to my personal portfolio website. I'm Abrham Asrat, a full-stack web developer based in Addis Ababa, Ethiopia. I build modern, scalable web applications using React, Node.js, ASP.NET Core, and other modern technologies.

## 🚀 Live Demo

🔗 **Website:** [abrham-portfolio-ab.vercel.app](https://abrham-portfolio-ab.vercel.app/)

## ✨ Features

- Responsive design that works on desktop, tablet, and mobile
- Smooth animations and transitions
- Contact form with Firebase integration
- Project showcase with live demos and GitHub links
- Clean, modern UI with professional typography
- Fast loading and performance optimized

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React.js, Tailwind CSS, Framer Motion, Material UI |
| Animations | AOS (Animate On Scroll), Framer Motion |
| Icons | Lucide React |
| Backend/DB | Firebase (Firestore) |
| Notifications | SweetAlert2 |
| Deployment | Vercel |
| Build Tool | Vite |

## 📂 Project Structure

```

portfolio/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── sections/      # Page sections (Hero, Projects, Contact, etc.)
│   ├── data/          # Project data and content
│   ├── firebase/      # Firebase configuration
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── index.html
├── package.json
└── README.md

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Abrham-Asrat/portfolio.git
   cd portfolio
```

2. Install dependencies:
   ```bash
   npm install
   ```
   If you encounter peer dependency issues, use:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser:
   Visit http://localhost:5173 to view the site.

🔥 Firebase Configuration

The contact form uses Firebase Firestore. To set it up:

1. Go to the Firebase Console
2. Create a new project or use an existing one
3. Enable Firestore Database
4. Go to Project Settings → Your apps → Firestore Database
5. Copy your Firebase configuration
6. Create a .env file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
7. Update Firestore rules to allow write access for the contact form:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /messages/{message} {
         allow read: if false;
         allow write: if true;
       }
     }
   }
   ```

📦 Production Build

To create a production-ready build:

```bash
npm run build
```

The build files will be saved in the dist/ folder. Upload this folder to your hosting provider (Vercel, Netlify, etc.).

Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your environment variables
4. Deploy

📞 Contact

· Email: abrishasrat12@gmail.com
· LinkedIn: linkedin.com/in/abrham-asrat
· GitHub: github.com/Abrham-Asrat

📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ by Abrham Asrat

```