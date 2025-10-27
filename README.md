# TextForge API

> Part of the **LabKit** tech stack

<p align="center">
  <strong>A powerful REST API for text manipulation, analysis, and transformation</strong>
</p>

<p align="center">
  Built with TypeScript • Express • Production-Ready • Fully Tested
</p>

---

## Overview

TextForge is a comprehensive text processing API designed as a core component of the LabKit ecosystem. It provides essential text manipulation capabilities for modern web applications through a clean, RESTful interface.

Whether you're building a content management system, need to generate URL-safe slugs, detect languages, compare strings for similarity, or analyze text statistics, TextForge provides the tools you need through simple HTTP endpoints.

## Why TextForge?

- **🚀 Production-Ready** - Built with TypeScript, thoroughly tested, and battle-tested
- **🎯 Simple API** - Clean, consistent REST endpoints with JSON
- **📦 All-in-One** - Nine powerful text operations in a single service
- **🔒 Secure** - Input validation, security headers, and best practices baked in
- **📊 Well-Documented** - Comprehensive guides and examples
- **🐳 Deploy Anywhere** - Docker support, cloud-ready, highly scalable
- **🧪 Fully Tested** - Complete test coverage with Jest and Supertest

## Features

### Core Capabilities

- **Slugification** - Transform messy text into clean, URL-safe slugs
  ```
  "Hello World! This is Great???" → "hello-world-this-is-great"
  ```

- **Text Transformation** - Convert between naming conventions and formats
  - camelCase, snake_case, PascalCase, kebab-case
  - Trim whitespace, reverse strings, remove special characters
  - Unicode normalization

- **Language Detection** - Identify the language of any text
  - Supports 15+ languages
  - Confidence scoring
  - ISO language codes

- **String Similarity** - Compare and score text similarity
  - Percentage similarity (0-100)
  - Levenshtein distance
  - Perfect for duplicate detection

- **Text Analysis** - Comprehensive text statistics and insights
  - Word count and sentence extraction
  - Readability scoring (Flesch Reading Ease)
  - Word frequency analysis
  - Unique word counts

- **Content Moderation** - Built-in profanity detection and filtering

## Quick Start

### 5-Minute Setup

```bash
# Clone and install
git clone https://github.com/yourusername/TextForge.git
cd TextForge
npm install

# Configure and run
cp .env.example .env
npm run dev
```

The API is now running at `http://localhost:3000`

### Docker (Even Faster)

```bash
docker-compose up
```

### Your First Request

```bash
curl -X POST http://localhost:3000/api/v1/slugify \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World!"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "Hello World!",
    "slug": "hello-world"
  }
}
```

## API Endpoints

All endpoints available at `http://localhost:3000/api/v1`:

| Endpoint | Purpose | Use Case |
|----------|---------|----------|
| `POST /slugify` | Generate URL-safe slugs | Blog URLs, product IDs |
| `POST /transform` | Transform text case/format | Variable naming, data formatting |
| `POST /language/detect` | Detect text language | Content routing, i18n |
| `POST /similarity` | Compare string similarity | Duplicate detection, search |
| `POST /utility/word-count` | Count words | Content analysis |
| `POST /utility/sentences` | Extract sentences | Summarization |
| `POST /utility/statistics` | Analyze text metrics | Readability scoring |
| `POST /utility/word-frequency` | Get word frequencies | Keyword analysis |
| `POST /utility/profanity-check` | Filter profanity | Content moderation |

## Use Cases

### Content Management Systems
Generate clean URLs from article titles, analyze readability scores, count words.

### E-commerce Platforms
Detect duplicate product descriptions, create SEO-friendly URLs, moderate user reviews.

### Translation Services
Automatically detect source language, route content to appropriate translators.

### Data Processing Pipelines
Normalize text data, convert between naming conventions, clean user input.

### Social Media Tools
Moderate content, analyze text statistics, detect similar posts.

## Documentation

Complete guides for every aspect of TextForge:

- **[📚 Quick Start Guide](QUICKSTART.md)** - Get running in 5 minutes with examples
- **[📖 API Documentation](API_DOCUMENTATION.md)** - Complete API reference with all endpoints
- **[⚙️ Installation Guide](INSTALLATION.md)** - Detailed setup for all environments
- **[🚀 Deployment Guide](DEPLOYMENT.md)** - Production deployment strategies
- **[📝 Release Notes](RELEASE_NOTES.md)** - Version history and changelog

## Tech Stack

**Backend**
- TypeScript 5.3+ with strict mode
- Express.js 4.18+ for routing
- Comprehensive middleware stack

**Text Processing**
- `slugify` - URL slug generation
- `franc` - Language detection
- `string-similarity` - String comparison algorithms
- `bad-words` - Profanity filtering
- `compromise` - NLP capabilities

**Testing & Quality**
- Jest for unit and integration testing
- Supertest for HTTP testing
- ESLint for code quality
- Full test coverage

**DevOps**
- Docker & Docker Compose
- Health check endpoints
- Production-ready configurations
- Environment-based config

## System Requirements

**Minimum:**
- Node.js 18+
- 512 MB RAM
- 200 MB disk space

**Recommended:**
- Node.js 20 LTS
- 1 GB RAM
- 500 MB disk space

## Project Structure

```
TextForge/
├── src/
│   ├── __tests__/         # Comprehensive test suite
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── utils/             # Text processing utilities
│   ├── middleware/        # Validation & error handling
│   ├── routes/            # API routes
│   └── types/             # TypeScript definitions
├── dist/                  # Compiled output
├── docs/                  # Documentation
└── docker/                # Docker configurations
```

## Performance

- **Response Times**: <20ms average per request
- **Throughput**: 1000+ requests/second (single instance)
- **Scalability**: Horizontally scalable with Docker/Kubernetes
- **Memory**: ~100MB base footprint

## Security

- ✅ Helmet security headers
- ✅ CORS configuration
- ✅ Input validation on all endpoints
- ✅ Graceful error handling
- ✅ Non-root Docker user
- ✅ No known vulnerabilities

## Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes
6. Push to the branch
7. Open a Pull Request

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

## License

MIT License - feel free to use in your projects!

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/TextForge/issues)
- **Documentation**: See guides above
- **Community**: Join the LabKit community

## Roadmap

Future enhancements we're considering:

- [ ] Rate limiting and API keys
- [ ] Batch processing endpoints
- [ ] Additional language support
- [ ] GraphQL API
- [ ] Webhook support
- [ ] More text analysis features

## Acknowledgments

Built with love using amazing open-source libraries. Special thanks to:
- The TypeScript team
- Express.js maintainers
- All our contributors

---

<p align="center">
  <strong>Part of the LabKit Ecosystem</strong><br>
  Building better tools for developers
</p>

<p align="center">
  <a href="QUICKSTART.md">Quick Start</a> •
  <a href="API_DOCUMENTATION.md">API Docs</a> •
  <a href="INSTALLATION.md">Installation</a> •
  <a href="DEPLOYMENT.md">Deployment</a>
</p>
