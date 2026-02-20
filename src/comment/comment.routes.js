'use strict';

import { Router } from "express";
import {
    createComment,
    getComments,
}from './comment.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCommentOwnership } from '../../middlewares/validate-comment-ownership.js';

const router = Router();

router.post('/create', [validateJWT], createComment);
router.get('/', getComments);

export default router;
