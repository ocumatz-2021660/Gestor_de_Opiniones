'use strict';

import { Router } from "express";
import {
    createComment,
    getComments,
    updateComment,
    deleteComment,
}from './comment.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCommentOwnership } from '../../middlewares/validate-comment-ownership.js';

const router = Router();

router.post('/create', [validateJWT], createComment);
router.get('/', getComments);
router.put('/:id',[validateJWT, validateCommentOwnership], updateComment);
router.delete('/:id',[validateJWT, validateCommentOwnership], deleteComment);

export default router;
