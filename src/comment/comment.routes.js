'use strict';

import { Router } from "express";
import {
    createComment,
}from './comment.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCommentOwnership } from '../../middlewares/validate-comment-ownership.js';

const router = Router();

router.post('/create', [validateJWT], createComment);

export default router;
