const { securityHeaders, sanitizeInput } = require('../middleware/securityMiddleware');

describe('Security Middleware', () => {
  describe('securityHeaders', () => {
    it('should set security headers', () => {
      const req = {};
      const res = {
        removeHeader: jest.fn(),
        setHeader: jest.fn(),
      };
      const next = jest.fn();

      securityHeaders(req, res, next);

      expect(res.removeHeader).toHaveBeenCalledWith('X-Powered-By');
      expect(res.setHeader).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
      expect(res.setHeader).toHaveBeenCalledWith('X-Frame-Options', 'DENY');
      expect(res.setHeader).toHaveBeenCalledWith('X-XSS-Protection', '1; mode=block');
      expect(res.setHeader).toHaveBeenCalledWith('Referrer-Policy', 'strict-origin-when-cross-origin');
      expect(res.setHeader).toHaveBeenCalledWith('Content-Security-Policy', expect.any(String));
      expect(next).toHaveBeenCalled();
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize req.body', () => {
      const req = {
        body: {
          name: '  <script>alert("xss")</script> ',
          email: 'test@test.com',
        },
      };
      const res = {};
      const next = jest.fn();

      sanitizeInput(req, res, next);

      expect(req.body.name).toBe('scriptalert("xss")/script');
      expect(req.body.email).toBe('test@test.com');
      expect(next).toHaveBeenCalled();
    });

    it('should sanitize req.query', () => {
      const req = {
        query: {
          search: '  <img src="x" onerror="alert(1)">  ',
          filter: 'active',
        },
      };
      const res = {};
      const next = jest.fn();

      sanitizeInput(req, res, next);

      expect(req.query.search).toBe('img src="x" onerror="alert(1)"');
      expect(req.query.filter).toBe('active');
      expect(next).toHaveBeenCalled();
    });

    it('should handle missing body and query', () => {
        const req = {};
        const res = {};
        const next = jest.fn();

        sanitizeInput(req, res, next);

        expect(next).toHaveBeenCalled();
      });
  });
});
