# Decker

![React](https://camo.githubusercontent.com/3467eb8e0dc6bdaa8fa6e979185d371ab39c105ec7bd6a01048806b74378d24c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642) ![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

> A React-based web application for Magic: The Gathering players that allows searching for cards and tracking life totals during games, using the Scryfall API.

## 🚀 Features

### Card Search

- Search Magic: The Gathering cards using Scryfall API
- View card images, names, types, and oracle text
- Responsive grid layout for search results
- Real-time search with loading states
- Error handling with toast notifications

### Life Counter

- Track life totals for two players
- Poison counter tracking
- Dice rolling (D6 and D20)
- Customizable starting life total
- Landscape mode support for mobile devices

### Internationalization

- Multi-language support (English and Portuguese)
- Automatic language detection
- Language persistence
- Easy language switching with flag icons
- Full translation coverage for all app content

## 🛠️ Technologies

- React 18
- React Router v6
- Axios
- Framer Motion
- React Toastify
- Scryfall API
- i18next
- react-i18next
- i18next-browser-languagedetector

## 📦 Installation

### Standard Installation

1. Clone the repository

```bash
git clone https://github.com/zaqueu-1/decker.git
```

2. Install dependencies

```bash
cd decker
npm install
```

3. Start the development server

```bash
npm start
```

### 🐳 Docker Installation

1. Make sure you have Docker and Docker Compose installed

2. Clone the repository and navigate to the project folder

```bash
git clone https://github.com/zaqueu-1/decker.git
cd decker
```

3. Build and run the container

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`

To stop the container:

```bash
docker-compose down
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── background/    # Background component
│   ├── header/        # Header with navigation
│   └── search/        # Card search functionality
├── pages/
│   ├── Home/          # Main search page
│   └── LifeCounter/   # Life counter page
├── i18n.js           # Internationalization configuration
└── App.jsx            # Main application component
```

## 🌐 Internationalization

The app uses i18next for internationalization with the following features:

- **Supported Languages:**

  - English (default)
  - Portuguese

- **Auto Detection:**

  - Automatically detects user's preferred language
  - Falls back to English if preferred language is not supported

- **Language Persistence:**

  - Saves language preference to localStorage
  - Maintains selected language across sessions

- **Easy Integration:**
  - Uses react-i18next hooks for component translation
  - Supports interpolation for dynamic content
  - Handles pluralization and formatting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📦 Acknowledgments

- [Scryfall](https://scryfall.com/) for their amazing API
- [Wizards of the Coast](https://company.wizards.com/) for Magic: The Gathering
