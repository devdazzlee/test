import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/authRoutes.js';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth API', () => {
  it('should return 400 if fields are missing', async () => {
    const res = await request(app).post('/auth/login').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing fields');
  });

  it('should return 401 if credentials are invalid', async () => {
    const res = await request(app).post('/auth/login').send({ username: 'test', password: 'wrong' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });

  it('should return 200 if credentials are valid', async () => {
    // Assuming there is a user with username 'test' and password 'password'
    const res = await request(app).post('/auth/login').send({ username: 'test', password: 'password' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful');
  });
});
