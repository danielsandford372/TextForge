import request from 'supertest';
import app from '../app';

describe('Slugify Endpoint', () => {
  describe('POST /api/v1/slugify', () => {
    it('should convert text to slug', async () => {
      const response = await request(app)
        .post('/api/v1/slugify')
        .send({ text: 'Hello World! This is Great???' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.slug).toBe('hello-world-this-is-great');
    });

    it('should handle custom separator', async () => {
      const response = await request(app)
        .post('/api/v1/slugify')
        .send({
          text: 'Hello World',
          options: { separator: '_' },
        });

      expect(response.status).toBe(200);
      expect(response.body.data.slug).toBe('hello_world');
    });

    it('should handle strict mode', async () => {
      const response = await request(app)
        .post('/api/v1/slugify')
        .send({
          text: 'Café & Restaurant',
          options: { strict: true },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should return error for missing text', async () => {
      const response = await request(app).post('/api/v1/slugify').send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return error for empty text', async () => {
      const response = await request(app)
        .post('/api/v1/slugify')
        .send({ text: '   ' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
