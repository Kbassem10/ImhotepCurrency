# Imhotep Currency Converter

A fast, reliable Progressive Web App (PWA) for currency conversion with real-time exchange rates.

## Features

- 🌍 **150+ Currencies** - Support for major world currencies
- ⚡ **Real-time Rates** - Live exchange rate updates
- 📱 **PWA Support** - Install as an app on any device
- 🎨 **Modern UI** - Clean, responsive design
- 🔍 **Smart Search** - Quick currency lookup
- 🌙 **Dark Theme** - Eye-friendly dark mode
- 📱 **Mobile First** - Optimized for mobile devices

## Technologies

- **React 19** - Latest React with concurrent features
- **Vite** - Fast build tool and dev server
- **PWA** - Offline support and installable
- **Vercel** - Deployment and hosting

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kbassem10/ImhotepCurrency.git
cd ImhotepCurrency
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your API key to `.env`:
```env
VITE_EXCHANGE_API_KEY_PRIMARY=your-api-key-here
```

5. Start development server:
```bash
npm run dev
```

## Deployment

### Vercel Deployment

1. **Connect to GitHub**: Connect your repository to Vercel
2. **Environment Variables**: Add your environment variables in Vercel dashboard
3. **Deploy**: Vercel will automatically deploy on every push to main branch

### Manual Build

```bash
npm run build
npm run preview
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_EXCHANGE_API_KEY_PRIMARY` | Exchange rates API key | Yes |

## PWA Features
- **Install Prompt** - Can be installed on devices

## SEO Optimization

- **Meta Tags** - Comprehensive SEO meta tags
- **Open Graph** - Social media previews
- **Structured Data** - JSON-LD for search engines
- **Sitemap** - XML sitemap for crawlers
- **Robots.txt** - Search engine directives

## API Integration

The app integrates with the Imhotep Exchange Rates API:
- **Base URL**: `https://imhotepexchangeratesapi.pythonanywhere.com`
- **Endpoint**: `/convert/latest_rates/{api_key}/{from}/{to}/{amount}`
- **Response Format**: JSON with conversion data and metadata

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Website**: [https://imhotepcc.vercel.app](https://imhotepcc.vercel.app)
- **Email**: imhoteptech@outlook.com
- **GitHub**: [https://github.com/Kbassem10/ImhotepCurrency](https://github.com/Kbassem10/ImhotepCurrency)

## Acknowledgments

- **Exchange Rates API** - Imhotep Exchange Rates API
- **Icons** - Font Awesome
- **Hosting** - Vercel

---

Made with ❤️ by [Imhotep Tech](https://imhoteptech.vercel.app)
