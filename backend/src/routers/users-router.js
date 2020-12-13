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
    const imagePath = `images/${imageFile.path.split(/[\\/]/)[1]}`;

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

router.get('/profile', async (req, res) => {
  const { payload } = req;
  try {
    const user = await userService.getById(payload.id);

    if (!user) {
      return res.status(404)
        .send({
          success: false,
          message: 'Usuário não existe',
        });
    }

    return res.status(200)
      .send({
        success: true,
        data: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          cpf: user.cpf,
          accessLevel: user.accessLevel,
          image: user.image,
        },
      });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: process.env.DEBUG ? err : 'Server error',
    });
  }
});

router.put('/profile', upload.single('avatar'), async (req, res) => {
  const {
    fullName,
    password,
  } = req.body;
  const { id } = req.payload;
  const image = req.file;

  try {
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    if (fullName) {
      user.fullName = fullName;
    }
    if (password) {
      user.password_hash = await authService.generateHash(password);
    }

    if (image) {
      user.image.name = image.originalname;
      user.image.path = `images/${req.file.path.split(/[\\/]/)[1]}`;
    }

    await userService.update(user);

    return res.status(200).send({
      success: true,
      message: 'Usuário atualizado',
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
});

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

router.get('/:id', isAuthenticated, async (req, res) => {
  const slugId = req.params.id;
  try {
    const user = await userService.getById(slugId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Usuário não existe',
      });
    }

    return res.status(200).send({
      success: true,
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        cpf: user.cpf,
        accessLevel: user.accessLevel,
        image: user.image,
      },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: process.env.DEBUG ? err : 'Server error',
    });
  }
});

/**
 * Atualiza os dados de um usuário
 */
router.put('/:id', upload.single('avatar'), async (req, res) => {
  const {
    fullName,
    password,
  } = req.body;
  const slugId = req.params.id;
  const image = req.file;

  try {
    const user = await userService.getById(slugId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    if (fullName) {
      user.fullName = fullName;
    }
    if (password) {
      user.password_hash = await authService.generateHash(password);
    }

    if (image) {
      user.image.name = image.originalname;
      user.image.path = `images/${req.file.path.split(/[\\/]/)[1]}`;
    }

    await userService.update(user);

    return res.status(200).send({
      success: true,
      message: 'Usuário atualizado',
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
});

/**
 * Troca o estado do usuário entre ativado e desativado
 */
router.put('/:id/activated', async (req, res) => {
  const slugId = req.params.id;
  try {
    const user = await userService.getById(slugId);

    if (!user) {
      return res.status(404)
        .send({
          success: false,
          message: 'Usuário não existe',
        });
    }

    user.accessLevel = user.accessLevel === AccessLevel.COMMON_USER
      ? AccessLevel.DEACTIVATED_USER
      : AccessLevel.COMMON_USER;

    await userService.update(user);
    const message = user.accessLevel === AccessLevel.COMMON_USER ? 'activated' : 'deactivated';
    return res.status(200).send({
      success: true,
      message,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: process.env.DEBUG ? err : 'Server error',
    });
  }
});

export default router;
