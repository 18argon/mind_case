import express from 'express';
import { authService, userService } from '../services/index.js';
import { AccessLevel } from '../models/index.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const {
    username,
    password,
  } = req.body;

  try {
    const user = await userService.getBy({ username });

    if (!user) {
      await authService.fakeVerify();
      return res.status(401)
        .send({
          success: false,
          message: 'Usuário não existe ou senha inválida',
        });
    }

    const isValid = await authService.verify(password, user.passwordHash);
    if (!isValid) {
      return res.status(401)
        .send({
          success: false,
          message: 'Usuário não existe ou senha inválida',
        });
    }

    if (user.accessLevel === AccessLevel.DEACTIVATED_USER) {
      return res.status(401).send({
        success: false,
        message: 'Usuário desativado',
      });
    }

    const refreshToken = authService.generateRefreshToken(user.id);

    const expireDate = authService.getRefreshTokenExpireDate();
    res.cookie('jid', refreshToken, {
      httpOnly: true,
      path: '/refresh',
      expires: expireDate,
    });

    const accessToken = authService.generateAccessToken(user.id);

    return res.status(200)
      .send({
        success: true,
        accessToken,
      });
  } catch (err) {
    return res.status(500)
      .send({
        success: false,
        message: process.env.DEBUG ? err : 'Server error',
      });
  }
});

router.post('/revoke', (req, res) => {
  res.clearCookie('jid', {
    httpOnly: true,
    path: '/refresh',
  });

  res.status(200).send({
    success: true,
    message: 'Logout com sucesso',
  });
});

export default router;
