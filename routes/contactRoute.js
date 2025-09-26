import express from 'express';
import { addEmergencyContacts } from '../controller/ContactController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/my-contacts', authenticate, addEmergencyContacts);

export default router;
