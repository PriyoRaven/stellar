# ✨ Stellar - AI Chat Application

<div align="center">

![Stellar Banner](https://img.shields.io/badge/Stellar-AI%20Chat-amber?style=for-the-badge&logo=google&logoColor=white)

**A beautiful, feature-rich AI chat application powered by Google Gemini**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Roadmap](#-roadmap) • [Contributing](#-contributing)

</div>

---

## 🌟 Features

### 🤖 AI-Powered Conversations
- **Multiple Gemini Models** - Choose between Gemini Flash, Pro, and Lite
- **AI Personas** - Switch between different conversation styles (Classic, Creative Writer, Code Expert, Study Tutor, Casual Friend)
- **Smart Suggestions** - AI-powered follow-up prompts to keep conversations flowing

### 🎨 Beautiful Customization
- **Dynamic Themes** - Full color wheel with unlimited hue selection
- **Dark/Light Modes** - Plus special Pure White and Pure Black themes
- **Responsive Design** - Optimized for mobile, tablet, and desktop

### 🔍 Advanced Features
- **Web Search Grounding** - Real-time information with cited sources
- **File Uploads** - Analyze images and PDFs with AI
- **Conversation Management** - Rename, delete, and organize chats
- **Token Optimization** - Efficient API usage with smart context management

### 💾 Data Persistence
- **Local Storage** - Chats saved automatically in your browser
- **Conversation History** - Pick up where you left off

---

## 📸 Demo

### Main Chat Interface
The clean, modern chat interface with AI personas and smart suggestions.

### Theme Customization
Choose from unlimited colors or special themes to match your style.

### Responsive Design
Works beautifully on any device - mobile, tablet, or desktop.

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/PriyoRaven/stellar.git
   cd stellar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GOOGLE_API_KEY=your_gemini_api_key_here
   ```
   
   > Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 💡 Usage

### Starting a Conversation
1. Select an AI persona from the sidebar (optional)
2. Type your message in the input field
3. Press Enter or click the send button

### Using Web Search
1. Click the globe icon to enable web search
2. Your queries will include real-time information
3. Sources are displayed below AI responses

### Uploading Files
1. Click the attachment icon
2. Select images or PDFs
3. Ask questions about the uploaded content

### Customizing Themes
1. Click "Themes" in the sidebar
2. Use the color wheel or select a preset
3. Toggle between dark and light modes

---

## 🗺️ Roadmap

### ✅ Completed
- Gemini Integration with multiple models
- Dynamic theme system
- AI Personas
- Web search grounding
- File upload support
- Smart suggestions
- Responsive design
- Token optimization

### 🚧 Planned
- [ ] Database integration (replacing local storage)
- [ ] User authentication (Sign Up / Sign In)
- [ ] Usage analytics & quota tracking
- [ ] Settings page
- [ ] Cloud sync across devices
- [ ] PWA support

### 💭 Future Ideas
- Voice input
- Image generation
- Plugin system
- Team collaboration

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| Google Gemini API | AI capabilities |
| React Router | Navigation |
| React Icons | Icon library |

---

## 📁 Project Structure

```
stellar/
├── src/
│   ├── components/
│   │   ├── Main/          # Chat interface components
│   │   ├── Sidebar/       # Navigation & settings
│   │   ├── UI/            # Reusable UI components
│   │   ├── About/         # About page
│   │   └── Roadmap/       # Roadmap page
│   ├── context/           # React Context (theme, app state)
│   ├── assets/            # Images & static files
│   ├── App.jsx            # Root component
│   └── index.css          # Global styles
├── public/
├── .env                   # Environment variables
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact

**Priyadarsi (Raven)**

- Email: [priyadarsi02@gmail.com](mailto:priyadarsi02@gmail.com)
- GitHub: [@PriyoRaven](https://github.com/PriyoRaven)
- LinkedIn: [Priyadarsi Halder](https://www.linkedin.com/in/priyadarsi-halder/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with 💛 by [Priyadarsi](https://github.com/PriyoRaven)

**If you found this helpful, please ⭐ the repository!**

</div>
