import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

/**
 * Criptografa o valor com o BCript
 * @param {string} value Senha a do usuário a ser criptografada
 */
export const generateHash = async (value) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(value, salt);
};

/**
 * Verifica se um valor a ser testada corresponde ao valor da hash
 * @param {string} value Valor a ser testado
 * @param {string} hash Valor encriptogrado
 */
export const verify = async (value, hash) => bcrypt.compare(value, hash);

/**
 * Simulação da verificação
 */
export const fakeVerify = async () => bcrypt.compare('*my_password*', 'fake_hash');

/**
 * Gera um novo 'refresh token'
 * @param {string} id ID do usuário
 */
export const generateRefreshToken = (id) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
  expiresIn: '7d', // 7 dias
});

/**
 * Gera um novo 'access token'
 * @param {string} id ID do usuário
 */
export const generateAccessToken = (id) => jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
  expiresIn: '15m', // 15 min
});

/**
 * Testa se o 'refresh token' é válido
 * @param {string} token token a ser testado
 */
export const verifyRefreshToken = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET);

/**
 * Testa se o 'access token' é válido
 * @param {string} token token a ser testado
 */
export const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_ACCESS_SECRET);

export const getRefreshTokenExpireDate = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
