import request from 'supertest';
import app from '../app';

describe('Similarity Endpoint', () => {
  describe('POST /api/v1/similarity', () => {
    it('should calculate similarity for identical strings', async () => {
      const response = await request(app)
        .post('/api/v1/similarity')
        .send({ text1: 'hello world', text2: 'hello world' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.similarityScore).toBe(100);
      expect(response.body.data.levenshteinDistance).toBe(0);
      expect(response.body.data.interpretation).toBe('Very similar');
    });

    it('should calculate similarity for similar strings', async () => {
      const response = await request(app)
        .post('/api/v1/similarity')
        .send({ text1: 'hello world', text2: 'hello word' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.similarityScore).toBeGreaterThan(70);
      expect(response.body.data.levenshteinDistance).toBe(1);
    });

    it('should calculate similarity for different strings', async () => {
      const response = await request(app)
        .post('/api/v1/similarity')
        .send({ text1: 'hello', text2: 'goodbye' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.similarityScore).toBeLessThan(50);
      expect(response.body.data.levenshteinDistance).toBeGreaterThan(5);
    });

    it('should return error for missing text1', async () => {
      const response = await request(app)
        .post('/api/v1/similarity')
        .send({ text2: 'hello' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return error for missing text2', async () => {
      const response = await request(app)
        .post('/api/v1/similarity')
        .send({ text1: 'hello' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return error for empty strings', async () => {
      const response = await request(app)
        .post('/api/v1/similarity')
        .send({ text1: '   ', text2: '   ' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
