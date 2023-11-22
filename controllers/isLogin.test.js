import { login } from './auth.js';

describe('UserLogin function', () => {
  test('valid login', async () => {
    const req = {
      body: {
        email: 'maksBors45@gmail.com',
        password: '123456',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    // Моки или зависимости для функции login

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: {
        email: 'maksBors45@gmail.com',
        subscription: 'starter',
      },
    });
    expect(next).not.toHaveBeenCalled();
  });
});
