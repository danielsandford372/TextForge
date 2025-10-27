# TextForge API Documentation

Complete API reference for TextForge text manipulation API.

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

Currently, no authentication is required. All endpoints are publicly accessible.

## Common Response Format

All API responses follow this format:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```

## Endpoints

### 1. Health Check

Check if the API is running.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "success": true,
  "message": "TextForge API is running",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

### 2. Slugify

Convert text to URL-safe slugs.

**Endpoint:** `POST /slugify`

**Request Body:**
```json
{
  "text": "Hello World! This is Great???",
  "options": {
    "lowercase": true,     // Optional, default: true
    "strict": false,       // Optional, default: false
    "separator": "-"       // Optional, default: "-"
  }
}
```

**Parameters:**
- `text` (required): The text to slugify
- `options` (optional): Slugification options
  - `lowercase`: Convert to lowercase (default: true)
  - `strict`: Remove special characters strictly (default: false)
  - `separator`: Character to use as separator (default: "-")

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "original": "Hello World! This is Great???",
    "slug": "hello-world-this-is-great"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "text is required"
}
```

**Example Usage:**
```bash
curl -X POST http://localhost:3000/api/v1/slugify \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World!"}'
```

---

### 3. Transform

Transform text to different formats.

**Endpoint:** `POST /transform`

**Request Body:**
```json
{
  "text": "hello world test",
  "operation": "camelCase"
}
```

**Parameters:**
- `text` (required): The text to transform
- `operation` (required): The transformation operation

**Supported Operations:**

| Operation | Description | Example Input | Example Output |
|-----------|-------------|---------------|----------------|
| `camelCase` | Convert to camelCase | "hello world" | "helloWorld" |
| `snakeCase` | Convert to snake_case | "Hello World" | "hello_world" |
| `pascalCase` | Convert to PascalCase | "hello world" | "HelloWorld" |
| `kebabCase` | Convert to kebab-case | "Hello World" | "hello-world" |
| `trim` | Remove extra whitespace | "  hello  world  " | "hello world" |
| `reverse` | Reverse the string | "hello" | "olleh" |
| `removeSpecialChars` | Remove special characters | "hello@world!" | "helloworld" |
| `normalizeUnicode` | Normalize unicode | "café" | "cafe" |

**Success Response (200):**
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

**Error Response (400):**
```json
{
  "success": false,
  "error": "Invalid operation. Must be one of: camelCase, snakeCase, pascalCase, kebabCase, trim, reverse, removeSpecialChars, normalizeUnicode"
}
```

**Example Usage:**
```bash
curl -X POST http://localhost:3000/api/v1/transform \
  -H "Content-Type: application/json" \
  -d '{"text": "hello world", "operation": "camelCase"}'
```

---

### 4. Language Detection

Detect the language of text.

**Endpoint:** `POST /language/detect`

**Request Body:**
```json
{
  "text": "This is a test sentence in English."
}
```

**Parameters:**
- `text` (required): The text to analyze

**Success Response (200):**
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

**Response Fields:**
- `language`: Human-readable language name
- `confidence`: Confidence score (0-100)
- `iso639_1`: ISO 639-1 language code (2 letters)
- `iso639_3`: ISO 639-3 language code (3 letters)

**Supported Languages:**
English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, Dutch, Polish, Swedish, and more.

**Confidence Levels:**
- < 10 characters: ~30% confidence
- 10-50 characters: ~60% confidence
- 50-100 characters: ~80% confidence
- 100+ characters: ~95% confidence

**Example Usage:**
```bash
curl -X POST http://localhost:3000/api/v1/language/detect \
  -H "Content-Type: application/json" \
  -d '{"text": "Bonjour le monde"}'
```

---

### 5. String Similarity

Calculate similarity between two strings.

**Endpoint:** `POST /similarity`

**Request Body:**
```json
{
  "text1": "hello world",
  "text2": "hello word"
}
```

**Parameters:**
- `text1` (required): First string to compare
- `text2` (required): Second string to compare

**Success Response (200):**
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

**Response Fields:**
- `similarityScore`: Percentage similarity (0-100)
- `levenshteinDistance`: Number of single-character edits needed
- `interpretation`: Human-readable interpretation

**Interpretation Levels:**
- 80-100: "Very similar"
- 60-79: "Similar"
- 40-59: "Somewhat similar"
- 0-39: "Not similar"

**Example Usage:**
```bash
curl -X POST http://localhost:3000/api/v1/similarity \
  -H "Content-Type: application/json" \
  -d '{"text1": "hello", "text2": "hallo"}'
```

---

### 6. Word Count

Count words in text.

**Endpoint:** `POST /utility/word-count`

**Request Body:**
```json
{
  "text": "Hello world this is a test"
}
```

**Parameters:**
- `text` (required): The text to analyze

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "text": "Hello world this is a test",
    "wordCount": 6
  }
}
```

**Example Usage:**
```bash
curl -X POST http://localhost:3000/api/v1/utility/word-count \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world"}'
```

---

### 7. Sentence Extraction

Extract sentences from text.

**Endpoint:** `POST /utility/sentences`

**Request Body:**
```json
{
  "text": "Hello world. This is a test. How are you?",
  "maxSentences": 2
}
```

**Parameters:**
- `text` (required): The text to analyze
- `maxSentences` (optional): Maximum number of sentences to return

**Success Response (200):**
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

**Example Usage:**
```bash
curl -X POST http://localhost:3000/api/v1/utility/sentences \
  -H "Content-Type: application/json" \
  -d '{"text": "First. Second. Third.", "maxSentences": 2}'
```

---

### 8. Text Statistics

Get comprehensive text statistics.

**Endpoint:** `POST /utility/statistics`

**Request Body:**
```json
{
  "text": "Your text here. With multiple sentences."
}
```

**Parameters:**
- `text` (required): The text to analyze

**Success Response (200):**
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

**Response Fields:**
- `characterCount`: Total number of characters
- `wordCount`: Total number of words
- `sentenceCount`: Total number of sentences
- `paragraphCount`: Total number of paragraphs
- `averageWordLength`: Average length of words
- `averageSentenceLength`: Average words per sentence
- `readabilityScore`: Flesch Reading Ease score (0-100, higher = easier)
- `uniqueWords`: Number of unique words

**Readability Score Interpretation:**
- 90-100: Very easy to read
- 80-89: Easy to read
- 70-79: Fairly easy to read
- 60-69: Standard
- 50-59: Fairly difficult
- 30-49: Difficult
- 0-29: Very difficult

**Example Usage:**
```bash
curl -X POST http://localhost:3000/api/v1/utility/statistics \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'
```

---

### 9. Word Frequency

Analyze word frequency in text.

**Endpoint:** `POST /utility/word-frequency`

**Request Body:**
```json
{
  "text": "hello world hello test world hello"
}
```

**Parameters:**
- `text` (required): The text to analyze

**Success Response (200):**
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

**Notes:**
- Results are sorted by frequency (descending)
- Case-insensitive
- Special characters are removed from words

**Example Usage:**
```bash
curl -X POST http://localhost:3000/api/v1/utility/word-frequency \
  -H "Content-Type: application/json" \
  -d '{"text": "hello world hello"}'
```

---

### 10. Profanity Check

Check and filter profanity in text.

**Endpoint:** `POST /utility/profanity-check`

**Request Body:**
```json
{
  "text": "Your text here"
}
```

**Parameters:**
- `text` (required): The text to check

**Success Response (200):**
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

**Response Fields:**
- `containsProfanity`: Boolean indicating if profanity was found
- `cleanText`: Text with profanity masked with asterisks
- `detectedWords`: Array of detected profane words

**Example Usage:**
```bash
curl -X POST http://localhost:3000/api/v1/utility/profanity-check \
  -H "Content-Type: application/json" \
  -d '{"text": "Clean text"}'
```

---

## Rate Limiting

Currently, no rate limiting is implemented. This may be added in future versions.

## CORS

By default, CORS is enabled for all origins. Configure via `CORS_ORIGIN` environment variable.

## Error Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 400 | Bad Request - Invalid input or missing required fields |
| 404 | Not Found - Endpoint doesn't exist |
| 500 | Internal Server Error |

## Best Practices

1. **Always validate input** - Check that your text is not empty before sending
2. **Handle errors gracefully** - Check the `success` field in responses
3. **Use appropriate operations** - Choose the right transformation for your use case
4. **Consider text length** - Longer texts provide more accurate language detection
5. **Cache results** - Consider caching frequently used transformations

## SDKs and Client Libraries

Currently, there are no official SDKs. You can use any HTTP client to interact with the API.

**JavaScript/Node.js Example:**
```javascript
const response = await fetch('http://localhost:3000/api/v1/slugify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Hello World!'
  })
});

const data = await response.json();
console.log(data.data.slug); // hello-world
```

**Python Example:**
```python
import requests

response = requests.post(
    'http://localhost:3000/api/v1/slugify',
    json={'text': 'Hello World!'}
)

data = response.json()
print(data['data']['slug'])  # hello-world
```

## Support

For API support, please open an issue on GitHub or contact the maintainers.
