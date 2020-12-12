import express from 'express';
import upload from '../utils/multer.js';
import { hasRole, isAuthenticated } from '../middleware/index.js';
import { authService, userService } from '../services/index.js';
import { AccessLevel } from '../models/index.js';

const router = express.Router();

router.post('/', upload.single('avatar'), async (req, res) => {
  const {
    fullName,
    email,
    cpf,
    password,
  } = req.body;
  const imageFile = req.file;

  try {
    const user = await userService.getBy({ email, cpf });

    if (user) {
      return res.status(400).send({
        success: false,
        message: 'Usuário já existe',
      });
    }

    const hash = await authService.generateHash(password);
    const imagePath = `images/${imageFile.path.split('/')[1]}`;

    const image = {
      name: imageFile.originalname,
      path: imagePath,
    };
    const newUser = await userService
      .insert(fullName, email, cpf, hash, image, AccessLevel.COMMON_USER);

    return res.status(201)
      .send({
        success: true,
        data: {
          id: newUser.id,
        },
      });
  } catch (err) {
    return res.status(500)
      .send({
        success: false,
        message: process.env.DEBUG ? err : 'Server error',
      });
  }
});

router.use(isAuthenticated);

router.use(hasRole(AccessLevel.ADMIN));

/**
 * Retorna uma lista com todos os usuários
 */
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAll();

    return res.status(200)
      .send({
        success: true,
        data: users,
      });
  } catch (err) {
    return res.status(500)
      .send({
        success: false,
        message: process.env.DEBUG ? err : 'Server error',
      });
  }
});

export default router;
