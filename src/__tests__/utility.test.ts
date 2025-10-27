import request from 'supertest';
import app from '../app';

describe('Utility Endpoints', () => {
  describe('POST /api/v1/utility/word-count', () => {
    it('should count words correctly', async () => {
      const response = await request(app)
        .post('/api/v1/utility/word-count')
        .send({ text: 'Hello world this is a test' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.wordCount).toBe(6);
    });

    it('should handle multiple spaces', async () => {
      const response = await request(app)
        .post('/api/v1/utility/word-count')
        .send({ text: 'Hello   world   test' });

      expect(response.status).toBe(200);
      expect(response.body.data.wordCount).toBe(3);
    });
  });

  describe('POST /api/v1/utility/sentences', () => {
    it('should extract all sentences', async () => {
      const response = await request(app)
        .post('/api/v1/utility/sentences')
        .send({ text: 'Hello world. This is a test. How are you?' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.sentences).toHaveLength(3);
      expect(response.body.data.count).toBe(3);
    });

    it('should limit sentences when maxSentences is provided', async () => {
      const response = await request(app)
        .post('/api/v1/utility/sentences')
        .send({
          text: 'First sentence. Second sentence. Third sentence.',
          maxSentences: 2,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.sentences).toHaveLength(2);
    });
  });

  describe('POST /api/v1/utility/statistics', () => {
    it('should return comprehensive text statistics', async () => {
      const text = 'Hello world. This is a test. How are you doing today?';
      const response = await request(app)
        .post('/api/v1/utility/statistics')
        .send({ text });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('characterCount');
      expect(response.body.data).toHaveProperty('wordCount');
      expect(response.body.data).toHaveProperty('sentenceCount');
      expect(response.body.data).toHaveProperty('paragraphCount');
      expect(response.body.data).toHaveProperty('averageWordLength');
      expect(response.body.data).toHaveProperty('averageSentenceLength');
      expect(response.body.data).toHaveProperty('readabilityScore');
      expect(response.body.data).toHaveProperty('uniqueWords');

      expect(response.body.data.characterCount).toBe(text.length);
      expect(response.body.data.wordCount).toBeGreaterThan(0);
      expect(response.body.data.sentenceCount).toBe(3);
    });
  });

  describe('POST /api/v1/utility/word-frequency', () => {
    it('should return word frequency analysis', async () => {
      const response = await request(app)
        .post('/api/v1/utility/word-frequency')
        .send({ text: 'hello world hello test world hello' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('frequency');
      expect(response.body.data).toHaveProperty('totalUniqueWords');
      expect(response.body.data.frequency.hello).toBe(3);
      expect(response.body.data.frequency.world).toBe(2);
      expect(response.body.data.frequency.test).toBe(1);
      expect(response.body.data.totalUniqueWords).toBe(3);
    });

    it('should sort by frequency descending', async () => {
      const response = await request(app)
        .post('/api/v1/utility/word-frequency')
        .send({ text: 'a a a b b c' });

      expect(response.status).toBe(200);
      const words = Object.keys(response.body.data.frequency);
      const frequencies = Object.values(response.body.data.frequency) as number[];

      // Check that frequencies are in descending order
      for (let i = 0; i < frequencies.length - 1; i++) {
        expect(frequencies[i]).toBeGreaterThanOrEqual(frequencies[i + 1]);
      }
    });
  });

  describe('POST /api/v1/utility/profanity-check', () => {
    it('should detect profanity in text', async () => {
      const response = await request(app)
        .post('/api/v1/utility/profanity-check')
        .send({ text: 'This is a clean sentence' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('containsProfanity');
      expect(response.body.data).toHaveProperty('cleanText');
      expect(response.body.data).toHaveProperty('detectedWords');
      expect(response.body.data.containsProfanity).toBe(false);
    });

    it('should clean profane text', async () => {
      const response = await request(app)
        .post('/api/v1/utility/profanity-check')
        .send({ text: 'This is a test' });

      expect(response.status).toBe(200);
      expect(response.body.data.cleanText).toBe('This is a test');
    });
  });
});
