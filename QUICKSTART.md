# TextForge Quick Start Guide

> Part of the **LabKit** tech stack

Get up and running with TextForge in under 5 minutes!

## 🚀 Quick Install

### Option 1: Docker (Fastest)

```bash
# Pull and run (when available on Docker Hub)
docker run -d -p 3000:3000 textforge:1.0

# OR build locally
git clone https://github.com/yourusername/TextForge.git
cd TextForge
docker-compose up -d
```

### Option 2: Node.js

```bash
# Clone and install
git clone https://github.com/yourusername/TextForge.git
cd TextForge
npm install

# Configure
cp .env.example .env

# Start
npm run dev
```

The API is now running at `http://localhost:3000`

---

## ✅ Verify It Works

```bash
curl http://localhost:3000/api/v1/health
```

You should see:
```json
{
  "success": true,
  "message": "TextForge API is running"
}
```

---

## 🎯 Try Your First API Call

### 1. Slugify Text

Convert text to URL-safe slugs:

```bash
curl -X POST http://localhost:3000/api/v1/slugify \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World! This is Great???"}'
```

Response:
```json
{
  "success": true,
  "data": {
    "original": "Hello World! This is Great???",
    "slug": "hello-world-this-is-great"
  }
}
```

### 2. Transform Text to camelCase

```bash
curl -X POST http://localhost:3000/api/v1/transform \
  -H "Content-Type: application/json" \
  -d '{"text": "hello world test", "operation": "camelCase"}'
```

Response:
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

### 3. Detect Language

```bash
curl -X POST http://localhost:3000/api/v1/language/detect \
  -H "Content-Type: application/json" \
  -d '{"text": "Bonjour le monde"}'
```

Response:
```json
{
  "success": true,
  "data": {
    "language": "French",
    "confidence": 95,
    "iso639_1": "fr"
  }
}
```

### 4. Compare Strings

```bash
curl -X POST http://localhost:3000/api/v1/similarity \
  -H "Content-Type: application/json" \
  -d '{"text1": "hello world", "text2": "hello word"}'
```

Response:
```json
{
  "success": true,
  "data": {
    "similarityScore": 85.71,
    "levenshteinDistance": 1,
    "interpretation": "Very similar"
  }
}
```

---

## 🔥 Common Use Cases

### Use Case 1: Generate URL Slugs for Blog Posts

```javascript
// JavaScript/Node.js
const response = await fetch('http://localhost:3000/api/v1/slugify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'My Awesome Blog Post Title!',
    options: { lowercase: true, separator: '-' }
  })
});

const data = await response.json();
console.log(data.data.slug); // my-awesome-blog-post-title
```

### Use Case 2: Convert User Input to Different Cases

```python
# Python
import requests

response = requests.post(
    'http://localhost:3000/api/v1/transform',
    json={
        'text': 'user_input_field',
        'operation': 'camelCase'
    }
)

print(response.json()['data']['result'])  # userInputField
```

### Use Case 3: Analyze Text Statistics

```bash
curl -X POST http://localhost:3000/api/v1/utility/statistics \
  -H "Content-Type: application/json" \
  -d '{"text": "Your article content here. With multiple sentences."}'
```

Get detailed statistics:
- Word count
- Character count
- Readability score
- Average sentence length
- Unique words count

### Use Case 4: Check for Duplicate Content

```javascript
// Detect similar product descriptions
const response = await fetch('http://localhost:3000/api/v1/similarity', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text1: 'Original product description',
    text2: 'Possibly duplicate description'
  })
});

const { similarityScore } = await response.json().data;
if (similarityScore > 80) {
  console.log('Possible duplicate detected!');
}
```

---

## 📚 Available Endpoints

| Endpoint | Purpose | Example |
|----------|---------|---------|
| `POST /api/v1/slugify` | Create URL-safe slugs | Blog URLs, identifiers |
| `POST /api/v1/transform` | Transform text case | Variable naming, formatting |
| `POST /api/v1/language/detect` | Detect text language | Content routing, translation |
| `POST /api/v1/similarity` | Compare strings | Duplicate detection, fuzzy search |
| `POST /api/v1/utility/word-count` | Count words | Content analysis |
| `POST /api/v1/utility/sentences` | Extract sentences | Text summarization |
| `POST /api/v1/utility/statistics` | Text analysis | Readability scoring |
| `POST /api/v1/utility/word-frequency` | Word frequency | Keyword analysis |
| `POST /api/v1/utility/profanity-check` | Filter profanity | Content moderation |

---

## 🛠️ Text Transformation Operations

All available with `POST /api/v1/transform`:

| Operation | Input | Output |
|-----------|-------|--------|
| `camelCase` | "hello world" | "helloWorld" |
| `snakeCase` | "Hello World" | "hello_world" |
| `pascalCase` | "hello world" | "HelloWorld" |
| `kebabCase` | "Hello World" | "hello-world" |
| `trim` | "  hello  world  " | "hello world" |
| `reverse` | "hello" | "olleh" |
| `removeSpecialChars` | "hello@world!" | "helloworld" |
| `normalizeUnicode` | "café" | "cafe" |

---

## 💡 Pro Tips

### 1. Batch Processing

Process multiple texts efficiently:

```javascript
const texts = ['Text One', 'Text Two', 'Text Three'];

const results = await Promise.all(
  texts.map(text =>
    fetch('http://localhost:3000/api/v1/slugify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    }).then(r => r.json())
  )
);
```

### 2. Error Handling

Always check the `success` field:

```javascript
const response = await fetch('http://localhost:3000/api/v1/slugify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: '' })
});

const data = await response.json();

if (!data.success) {
  console.error('Error:', data.error);
} else {
  console.log('Result:', data.data);
}
```

### 3. Custom Slugification

Fine-tune slug generation:

```javascript
const response = await fetch('http://localhost:3000/api/v1/slugify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'My Article Title',
    options: {
      lowercase: true,      // Force lowercase
      strict: true,         // Remove special chars strictly
      separator: '_'        // Use underscore instead of dash
    }
  })
});
```

### 4. Language Detection Best Practices

For best results:
- Use at least 50 characters of text
- Longer texts = higher confidence scores
- Mix of common words improves accuracy

---

## 🧪 Testing

Run the test suite:

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm test -- --coverage
```

---

## 📖 Next Steps

- **Full API Reference**: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Detailed Installation**: See [INSTALLATION.md](INSTALLATION.md)
- **Production Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Main Documentation**: See [README.md](README.md)

---

## 🆘 Troubleshooting Quick Fixes

### API Not Responding

```bash
# Check if it's running
curl http://localhost:3000/api/v1/health

# Check logs
npm run dev  # See console output
docker logs textforge-api  # If using Docker
```

### Port Already in Use

```bash
# Change port in .env file
echo "PORT=3001" > .env

# Or kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🎓 Learn More

- **GitHub Repository**: [github.com/yourusername/TextForge](https://github.com/yourusername/TextForge)
- **Issues & Support**: [Report an issue](https://github.com/yourusername/TextForge/issues)
- **LabKit Ecosystem**: Learn more about LabKit tools

---

**Ready to build?** Start integrating TextForge into your applications today!

**LabKit** | Building better tools for developers
