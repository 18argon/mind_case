import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

/**
 * Configurações para o multer
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const filename = crypto.randomBytes(16).toString('hex');
    cb(null, `${filename}${path.extname(file.originalname)}`);
  },
});

export default multer({ storage });
