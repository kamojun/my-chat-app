import { Router } from 'express';
import { handleMessage } from '../controllers/messageController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/', upload.array('images'), handleMessage);

export default router;
