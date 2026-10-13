# 💍 Wedding Invitation Website

A beautiful, interactive digital wedding invitation website created to celebrate the wedding of **Neha & Irfan**. Designed with an elegant Royal Champagne & Gold theme, the website brings together traditional Pakistani wedding aesthetics and modern web technologies to create a memorable online invitation experience.

## ✨ Features

- **Elegant Wedding Invitation** — A royal champagne-and-gold design with floral decorations and a luxurious wedding atmosphere.
- **Animated Invitation Experience** — Smooth transitions and beautiful visual effects for an engaging introduction.
- **Wedding Countdown** — A countdown to the wedding celebration.
- **Wedding Details** — Displays the event date, venue, gathering time, Nikah, dinner, and RSVP information.
- **Interactive Guestbook** — Guests can submit their wedding wishes, which are stored and displayed using Supabase.
- **Wedding Music** — Background wedding music with a dedicated music control button.
- **Custom Favicon** — A wedding rings icon matching the theme.
- **Responsive Design** — Optimized for desktop and mobile browsers.
- **Online Deployment** — Hosted using Vercel for easy access and sharing.

## 🛠️ Tech Stack

- **Frontend:** React
- **Build Tool:** Vite
- **Styling:** CSS
- **Database & Backend Services:** Supabase
- **Deployment:** Vercel
- **Version Control:** Git and GitHub

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/alishah18105/Wedding-Invitation-Website.git
cd Wedding-Invitation-Website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add your Supabase project credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
```

Use the appropriate public key supported by your Supabase project and application setup.

**Security note:** Never expose your Supabase `service_role` key in frontend code or commit secret credentials to GitHub. Configure appropriate Row Level Security (RLS) policies for the guestbook table.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 🗄️ Supabase Guestbook Setup

The guestbook uses Supabase to store and retrieve wedding wishes.

1. Create a project in [Supabase](https://supabase.com/).
2. Create a `wishes` table with columns matching the fields used by the application.
3. Configure appropriate RLS policies for reading and submitting wishes.
4. Add the project URL and public key to your `.env` file.
5. Restart the development server.

Ensure the table schema and policies match the application's queries and intended guestbook behavior.

## 🌐 Deployment

This project can be deployed using [Vercel](https://wedding-invitation-websiite.vercel.app/).

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in the Vercel project settings.
4. Use the appropriate build command, typically `npm run build`.
5. Set the output directory to `dist` for a standard Vite project.
6. Deploy the website and share the generated URL with your guests.

**Important:** Environment variables configured locally are not automatically available in Vercel. Add them separately in the deployment settings and redeploy after making changes.

## 🎵 Music Playback

The website includes background wedding music with an interactive control. Automatic playback may be restricted by mobile browsers until the visitor interacts with the page. The music control allows guests to start or pause playback.

## 📁 Project Structure

A typical project structure looks like this:

```text
wedding-invitation/
├── public/
│   ├── favicon
│   └── wedding-music-file
├── src/
│   ├── components/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

The actual folder and file names may vary depending on the project implementation.

## 🔒 Environment Variables

For local development, keep your credentials in `.env`. Commit an `.env.example` file containing placeholder values instead of actual credentials.

Example:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## ❤️ A Personal Project

This website was created as a personalized digital wedding invitation, combining traditional wedding celebrations with a modern, interactive online experience.

Made with love for **Neha & Irfan**. 💍

---

**Built with React, Vite, Supabase, and lots of love.**