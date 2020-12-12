import { userService } from '../services/index.js';

export default (accessLevel) => async (req, res, next) => {
  const { payload } = req;
  const user = await userService.getById(payload.id);
  if (user.accessLevel !== accessLevel) {
    return res.status(401).send({
      success: false,
      message: 'Acesso não autorizado',
    });
  }
  return next();
};
