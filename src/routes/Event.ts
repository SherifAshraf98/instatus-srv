import { Router } from 'express';
import { createEvents, listEvents } from '../controllers/Event';

export const router = Router();

router.post('/', createEvents);
router.get('/', listEvents);
