# 🧩 Find & Match Adventure

A fun, kid-friendly web game where children explore colorful, detailed images and find hidden objects. Perfect for kids aged 4-9 to improve visual recognition, focus, and memory through engaging gameplay.

![Game Preview](https://via.placeholder.com/800x400/87CEEB/FFFFFF?text=Find+%26+Match+Adventure)

## 🎯 Features

- **Interactive Gameplay**: Click on objects in detailed scenes to find hidden items
- **Visual Feedback**: Animated success/error feedback with sound effects
- **Progressive Scoring**: Track progress and earn points for each correct find
- **Kid-Friendly Design**: Bright colors, large buttons, and simple navigation
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Multiple Levels**: Three themed scenes to explore (Jungle, Ocean, Space)
- **Real-time Coordinates**: Hover to see mouse coordinates for debugging
- **Educational**: Helps kids learn about coordinate systems and visual recognition

## 🚀 Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download here](https://git-scm.com/))
- A **Supabase account** ([Sign up here](https://supabase.com))

## 🛠️ Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd find-and-match-adventure
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Supabase

#### 3.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click **"New Project"**
4. Fill in the project details:
   - **Name**: `find-and-match-adventure`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest to your location
5. Click **"Create new project"** (this takes 1-2 minutes)

#### 3.2 Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

#### 3.3 Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `master-database-setup.sql` from this project
4. Paste it into the SQL editor
5. Click **"Run"** to execute the SQL

You should see output showing:
- "Levels created: 3"
- "Objects created: 9"
- A table with all objects and their coordinates

### Step 4: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values with your actual Supabase credentials:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the game!

## 🎮 How to Play

1. **Select a Level**: Choose from three themed adventures:
   - 🌿 **Jungle Adventure** - Find Red Bird, Green Tree, Blue Flower
   - 🌊 **Ocean Discovery** - Find Starfish, Seahorse, Shell
   - 🚀 **Space Explorer** - Find Alien, UFO, Meteor

2. **Find the Object**: Look at the target object in the right panel

3. **Click to Find**: Click on the matching object in the main scene

4. **Earn Points**: Get points for each correct find and see your progress

5. **Complete the Level**: Find all objects to finish the level!

## 🗂️ Project Structure

```
find-and-match-adventure/
├── public/
│   └── images/
│       ├── jungle-scene.svg          # Jungle Adventure scene
│       ├── ocean-scene.svg           # Ocean Discovery scene
│       ├── space-scene.svg           # Space Explorer scene
│       └── objects/                  # Individual object images
│           ├── red-bird.svg
│           ├── green-tree.svg
│           ├── blue-flower.svg
│           ├── starfish.svg
│           ├── seahorse.svg
│           ├── shell.svg
│           ├── alien.svg
│           ├── ufo.svg
│           └── meteor.svg
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Main page component
│   │   └── layout.tsx                # Root layout
│   ├── components/
│   │   ├── GameArea.tsx              # Main game area with click detection
│   │   ├── TargetPanel.tsx           # Target object display
│   │   ├── ScoreBoard.tsx            # Score and progress tracking
│   │   └── LevelSelector.tsx         # Level selection interface
│   ├── contexts/
│   │   └── GameContext.tsx           # Game state management
│   └── lib/
│       └── supabase.ts               # Supabase client and types
├── master-database-setup.sql         # Complete database setup
├── .env.local.example                # Environment variables template
└── README.md                         # This file
```

## 🎨 Customization

### Adding New Levels

1. Create a new scene SVG file in `public/images/`
2. Create object images in `public/images/objects/`
3. Add level data to your Supabase database:
   ```sql
   INSERT INTO levels (title, image_url, thumbnail) VALUES
   ('Your New Level', '/images/your-scene.svg', '/images/your-scene.svg');
   ```
4. Add objects for the level:
   ```sql
   INSERT INTO objects (level_id, name, image_url, minX, minY, maxX, maxY) VALUES
   (4, 'Object Name', '/images/objects/object.svg', 100, 100, 150, 150);
   ```

### Adjusting Object Coordinates

Use the coordinate display feature (hover over the game area) to find exact coordinates, then update the database:

```sql
UPDATE objects 
SET minX = 100, minY = 100, maxX = 150, maxY = 150
WHERE name = 'Object Name' AND level_id = 1;
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **"Deploy"**

### Other Deployment Options

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Connect GitHub repo and add environment variables
- **Railway**: Deploy with automatic environment detection
- **AWS Amplify**: Full-stack deployment with database integration

## 🧠 Learning Objectives

This game helps children develop:
- **Visual Recognition**: Identifying objects in complex scenes
- **Attention to Detail**: Focusing on specific elements
- **Hand-Eye Coordination**: Precise clicking/tapping
- **Problem Solving**: Strategic thinking to find objects
- **Memory Skills**: Remembering object locations
- **Coordinate Understanding**: Learning about X and Y positioning

## 🎯 Target Audience

- **Age Group**: 4-9 years old
- **Platform**: Web-based (desktop, tablet, mobile)
- **Accessibility**: Designed for early readers and non-readers

## 🔧 Troubleshooting

### Common Issues

**"Module not found" errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Database connection issues:**
- Check your `.env.local` file has correct Supabase credentials
- Verify your Supabase project is active
- Ensure the database tables were created successfully

**Objects not clickable:**
- Check that the database coordinates match the SVG object positions
- Use the coordinate display feature to verify click positions
- Update coordinates in the database if needed

**Node.js version issues:**
- Ensure you're using Node.js 18 or higher
- Update Node.js if needed: [nodejs.org](https://nodejs.org/)

### Getting Help

1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure the database setup was completed successfully
4. Check that all image files exist in the `public/images/` directory

## 🔮 Future Enhancements

- [ ] Timer-based challenges
- [ ] Multiplayer mode
- [ ] Story progression system
- [ ] Voice guidance
- [ ] More themed levels
- [ ] Achievement system
- [ ] Parent dashboard
- [ ] Sound settings
- [ ] Difficulty levels

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help:

1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Review the Supabase documentation
4. Check the Next.js documentation

---

**Made with ❤️ for kids to learn and have fun!**

*Help children develop visual recognition, focus, and memory through engaging gameplay!*