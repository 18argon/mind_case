import { authService } from '../services/index.js';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401)
      .send({
        success: false,
        message: 'Acesso não autorizado',
      });
  }

  try {
    const token = authorization.split(' ')[1];
    req.payload = authService.verifyAccessToken(token);
    return next();
  } catch (err) {
    return res.status(401)
      .send({
        success: false,
        message: process.env.DEBUG ? err : 'Acesso não autorizado',
      });
  }
};
