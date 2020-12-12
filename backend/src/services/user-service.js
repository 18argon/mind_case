import User from '../models/user.js';

export const getAll = async () => {
  const query = { accessLevel: { $ne: 999 } };

  const projection = {
    fullName: 1,
    email: 1,
    cpf: 1,
    imageName: 1,
    imagePath: 1,
    accessLevel: 1,
  };

  try {
    return await User.find(query, projection);
  } catch (err) {
    return new Promise((resolve) => resolve([]));
  }
};

export const insert = async (fullName, email, cpf, passwordHash, image, accessLevel) => {
  const newUser = new User({
    fullName,
    cpf,
    email,
    passwordHash,
    image: {
      name: image.name,
      path: image.path,
    },
    accessLevel,
  });
  return newUser.save();
};

export const getBy = async ({ username, email, cpf }) => {
  const query = {
    $or: [
      { email: username || email },
      { cpf: username || cpf },
    ],
  };
  const projection = {};

  return User.findOne(query, projection);
};

export const getById = async (id) => {
  const query = {
    _id: id,
  };
  const projection = {};

  return User.findOne(query, projection);
};
