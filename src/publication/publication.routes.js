'use strict';

import { Router } from 'express';
import {
  createPublication,
  getPublications,
  getPublicationById,
} from './publication.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { optionalImageUpload } from '../../middlewares/optional-imagen-upload.js';

const router = Router();

router.post('/', [validateJWT, optionalImageUpload], createPublication);

router.get('/', getPublications);

router.get('/:id', getPublicationById);

export default router;