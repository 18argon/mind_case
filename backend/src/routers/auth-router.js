import express from 'express';
import jwt from 'jsonwebtoken';
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
      path: '/auth/refresh',
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
    path: '/auth/refresh',
  });

  res.status(200).send({
    success: true,
    message: 'Logout com sucesso',
  });
});

/**
 * Renova o refreshToken e o accessToken
 */
router.post('/refresh', async (req, res) => {
  const token = req.cookies.jid;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'Token não encontrado',
    });
  }

  try {
    const payload = authService.verifyRefreshToken(token);

    const user = await userService.getById(payload.id);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Token inválido',
      });
    }

    const accessToken = authService.generateAccessToken(user.id);

    return res.status(200).send({
      success: true,
      accessToken,
    });
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send({
        success: false,
        message: 'Token expirado',
      });
    }

    return res.status(401).send({
      success: false,
      message: 'Token inválido',
    });
  }
});

export default router;
