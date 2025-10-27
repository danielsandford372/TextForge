import request from 'supertest';
import app from '../app';

describe('Language Detection Endpoint', () => {
  describe('POST /api/v1/language/detect', () => {
    it('should detect English text', async () => {
      const response = await request(app)
        .post('/api/v1/language/detect')
        .send({
          text: 'This is a test sentence in English. It should be detected correctly.',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.language).toBe('English');
      expect(response.body.data.iso639_1).toBe('en');
      expect(response.body.data.confidence).toBeGreaterThan(0);
    });

    it('should detect Spanish text', async () => {
      const response = await request(app)
        .post('/api/v1/language/detect')
        .send({
          text: 'Esta es una prueba en español. Debería ser detectada correctamente.',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.language).toBe('Spanish');
      expect(response.body.data.iso639_1).toBe('es');
    });

    it('should detect French text', async () => {
      const response = await request(app)
        .post('/api/v1/language/detect')
        .send({
          text: 'Ceci est un test en français. Il devrait être détecté correctement.',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.language).toBe('French');
      expect(response.body.data.iso639_1).toBe('fr');
    });

    it('should handle short text with lower confidence', async () => {
      const response = await request(app)
        .post('/api/v1/language/detect')
        .send({ text: 'Hello' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.confidence).toBeLessThan(50);
    });

    it('should return error for missing text', async () => {
      const response = await request(app)
        .post('/api/v1/language/detect')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return error for empty text', async () => {
      const response = await request(app)
        .post('/api/v1/language/detect')
        .send({ text: '   ' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
