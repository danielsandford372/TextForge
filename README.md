# TextForge API

A powerful REST API for text manipulation, analysis, and transformation. Built with TypeScript, Express, and comprehensive text processing libraries.

## Features

- **Slugification** - Convert text to URL-safe slugs
- **Text Transformation** - Case conversions (camelCase, snake_case, PascalCase, kebab-case)
- **Language Detection** - Identify the language of text with confidence scores
- **String Similarity** - Compare strings with similarity scoring and Levenshtein distance
- **Text Analysis** - Word count, sentence extraction, text statistics
- **Profanity Filtering** - Detect and filter inappropriate content
- **Word Frequency** - Analyze word usage patterns

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd TextForge

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Build the project
npm run build

# Start the server
npm start
```

### Development Mode

```bash
# Run in development mode with auto-reload
npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## API Documentation

Base URL: `http://localhost:3000/api/v1`

### Health Check

```http
GET /api/v1/health
```

Returns the API health status.

### Slugification

Convert text to URL-safe slugs.

```http
POST /api/v1/slugify
Content-Type: application/json

{
  "text": "Hello World! This is Great???",
  "options": {
    "lowercase": true,
    "strict": false,
    "separator": "-"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "Hello World! This is Great???",
    "slug": "hello-world-this-is-great"
  }
}
```

### Text Transformation

Transform text between different formats.

```http
POST /api/v1/transform
Content-Type: application/json

{
  "text": "hello world test",
  "operation": "camelCase"
}
```

**Supported Operations:**
- `camelCase` - Convert to camelCase
- `snakeCase` - Convert to snake_case
- `pascalCase` - Convert to PascalCase
- `kebabCase` - Convert to kebab-case
- `trim` - Remove extra whitespace
- `reverse` - Reverse the string
- `removeSpecialChars` - Remove special characters
- `normalizeUnicode` - Normalize unicode characters

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "hello world test",
    "operation": "camelCase",
    "result": "helloWorldTest"
  }
}
```

### Language Detection

Detect the language of a given text.

```http
POST /api/v1/language/detect
Content-Type: application/json

{
  "text": "This is a test sentence in English."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "language": "English",
    "confidence": 95,
    "iso639_1": "en",
    "iso639_3": "eng"
  }
}
```

### String Similarity

Compare two strings and calculate similarity.

```http
POST /api/v1/similarity
Content-Type: application/json

{
  "text1": "hello world",
  "text2": "hello word"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "text1": "hello world",
    "text2": "hello word",
    "similarityScore": 85.71,
    "levenshteinDistance": 1,
    "interpretation": "Very similar"
  }
}
```

### Word Count

Count words in text.

```http
POST /api/v1/utility/word-count
Content-Type: application/json

{
  "text": "Hello world this is a test"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "text": "Hello world this is a test",
    "wordCount": 6
  }
}
```

### Sentence Extraction

Extract sentences from text.

```http
POST /api/v1/utility/sentences
Content-Type: application/json

{
  "text": "Hello world. This is a test. How are you?",
  "maxSentences": 2
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sentences": [
      "Hello world.",
      "This is a test."
    ],
    "count": 2
  }
}
```

### Text Statistics

Get comprehensive text statistics.

```http
POST /api/v1/utility/statistics
Content-Type: application/json

{
  "text": "Your text here..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "characterCount": 100,
    "wordCount": 20,
    "sentenceCount": 3,
    "paragraphCount": 1,
    "averageWordLength": 5.2,
    "averageSentenceLength": 6.67,
    "readabilityScore": 85.5,
    "uniqueWords": 18
  }
}
```

### Word Frequency

Analyze word frequency in text.

```http
POST /api/v1/utility/word-frequency
Content-Type: application/json

{
  "text": "hello world hello test world hello"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "frequency": {
      "hello": 3,
      "world": 2,
      "test": 1
    },
    "totalUniqueWords": 3
  }
}
```

### Profanity Check

Check and filter profanity in text.

```http
POST /api/v1/utility/profanity-check
Content-Type: application/json

{
  "text": "Your text here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "containsProfanity": false,
    "cleanText": "Your text here",
    "detectedWords": []
  }
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Not Found
- `500` - Internal Server Error

## Configuration

Environment variables (`.env` file):

```env
PORT=3000
NODE_ENV=development
API_PREFIX=/api/v1
CORS_ORIGIN=*
```

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Testing:** Jest + Supertest
- **Libraries:**
  - `slugify` - URL slug generation
  - `franc` - Language detection
  - `string-similarity` - String comparison
  - `bad-words` - Profanity filtering
  - `compromise` - Natural language processing

## Project Structure

```
TextForge/
├── src/
│   ├── __tests__/         # Test files
│   ├── config/            # Configuration
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   ├── app.ts             # Express app setup
│   └── index.ts           # Entry point
├── dist/                  # Compiled JavaScript
├── coverage/              # Test coverage reports
├── package.json
├── tsconfig.json
└── jest.config.js
```

## Docker Support

Build and run with Docker:

```bash
# Build image
docker build -t textforge .

# Run container
docker run -p 3000:3000 textforge
```

Or use Docker Compose:

```bash
docker-compose up
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
