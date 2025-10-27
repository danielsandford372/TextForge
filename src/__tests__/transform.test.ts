import request from 'supertest';
import app from '../app';

describe('Transform Endpoint', () => {
  describe('POST /api/v1/transform', () => {
    it('should convert to camelCase', async () => {
      const response = await request(app)
        .post('/api/v1/transform')
        .send({ text: 'hello world test', operation: 'camelCase' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.result).toBe('helloWorldTest');
    });

    it('should convert to snakeCase', async () => {
      const response = await request(app)
        .post('/api/v1/transform')
        .send({ text: 'Hello World Test', operation: 'snakeCase' });

      expect(response.status).toBe(200);
      expect(response.body.data.result).toBe('hello_world_test');
    });

    it('should convert to pascalCase', async () => {
      const response = await request(app)
        .post('/api/v1/transform')
        .send({ text: 'hello world test', operation: 'pascalCase' });

      expect(response.status).toBe(200);
      expect(response.body.data.result).toBe('HelloWorldTest');
    });

    it('should convert to kebabCase', async () => {
      const response = await request(app)
        .post('/api/v1/transform')
        .send({ text: 'Hello World Test', operation: 'kebabCase' });

      expect(response.status).toBe(200);
      expect(response.body.data.result).toBe('hello-world-test');
    });

    it('should trim text', async () => {
      const response = await request(app)
        .post('/api/v1/transform')
        .send({ text: '  hello   world  ', operation: 'trim' });

      expect(response.status).toBe(200);
      expect(response.body.data.result).toBe('hello world');
    });

    it('should reverse text', async () => {
      const response = await request(app)
        .post('/api/v1/transform')
        .send({ text: 'hello', operation: 'reverse' });

      expect(response.status).toBe(200);
      expect(response.body.data.result).toBe('olleh');
    });

    it('should remove special characters', async () => {
      const response = await request(app)
        .post('/api/v1/transform')
        .send({ text: 'hello@world#123!', operation: 'removeSpecialChars' });

      expect(response.status).toBe(200);
      expect(response.body.data.result).toBe('helloworld123');
    });

    it('should normalize unicode', async () => {
      const response = await request(app)
        .post('/api/v1/transform')
        .send({ text: 'café', operation: 'normalizeUnicode' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should return error for invalid operation', async () => {
      const response = await request(app)
        .post('/api/v1/transform')
        .send({ text: 'hello', operation: 'invalidOp' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return error for missing text', async () => {
      const response = await request(app)
        .post('/api/v1/transform')
        .send({ operation: 'camelCase' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
