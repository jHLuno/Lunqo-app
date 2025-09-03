const { authBrand, authAdmin } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('Auth Middleware', () => {
  const SECRET_KEY = process.env.JWT_SECRET;

  describe('authBrand', () => {
    it('should call next() if token is valid', () => {
      const brandId = new mongoose.Types.ObjectId().toHexString();
      const token = jwt.sign({ brandId }, SECRET_KEY);
      const req = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const res = {};
      const next = jest.fn();

      authBrand(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.brandId).toBe(brandId);
    });

    it('should return 401 if token is missing', () => {
      const req = {
        headers: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      authBrand(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', () => {
      const req = {
        headers: {
          authorization: 'Bearer invalidtoken',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      authBrand(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('authAdmin', () => {
    it('should call next() if token is valid and user is admin', () => {
      const token = jwt.sign({ isAdmin: true }, SECRET_KEY);
      const req = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const res = {};
      const next = jest.fn();

      authAdmin(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user is not admin', () => {
      const token = jwt.sign({ isAdmin: false }, SECRET_KEY);
      const req = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      authAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Admin access required' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token is missing', () => {
        const req = {
          headers: {},
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
        const next = jest.fn();

        authAdmin(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
        expect(next).not.toHaveBeenCalled();
      });
  });
});
