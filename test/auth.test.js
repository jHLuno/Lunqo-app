const request = require('supertest');
const app = require('../app');
const Brand = require('../models/Brand');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

describe('Auth Routes', () => {
  // Clean up the database before each test
  beforeEach(async () => {
    await Brand.deleteMany({});
  });

  describe('POST /api/auth/brand', () => {
    it('should login a brand with correct credentials', async () => {
      const password = 'password123';
      await Brand.create({
        name: 'Test Brand',
        email: 'brand@test.com',
        password: password,
      });

      const res = await request(app)
        .post('/api/auth/brand')
        .send({
          email: 'brand@test.com',
          password: password,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('brandId');
    });

    it('should not login with incorrect password', async () => {
        const password = 'password123';
        await Brand.create({
          name: 'Test Brand',
          email: 'brand@test.com',
          password: password,
        });

        const res = await request(app)
          .post('/api/auth/brand')
          .send({
            email: 'brand@test.com',
            password: 'wrongpassword',
          });

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toBe('Invalid credentials');
      });

    it('should not login with non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/brand')
        .send({
          email: 'nouser@test.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toBe('Invalid credentials');
    });

    it('should return 400 for missing email', async () => {
      const res = await request(app)
        .post('/api/auth/brand')
        .send({
          password: 'password123',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Email and password are required');
    });

    it('should return 400 for invalid email format', async () => {
        const res = await request(app)
          .post('/api/auth/brand')
          .send({
            email: 'invalid-email',
            password: 'password123',
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('Invalid email format');
      });
  });

  describe('POST /api/auth/admin', () => {
    it('should login an admin with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/admin')
        .send({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login with incorrect admin password', async () => {
      const res = await request(app)
        .post('/api/auth/admin')
        .send({
          email: process.env.ADMIN_EMAIL,
          password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toBe('Invalid credentials');
    });

    it('should return 400 for missing password', async () => {
        const res = await request(app)
          .post('/api/auth/admin')
          .send({
            email: process.env.ADMIN_EMAIL,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('Email and password are required');
      });
  });
});
