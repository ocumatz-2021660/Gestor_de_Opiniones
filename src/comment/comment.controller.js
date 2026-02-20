'use strict';

import Comment from './comment.model.js';
import Publication from '../publication/publication.model.js';

export const createComment = async (req, res) => {
    try {
        // Solo pedimos lo que el usuario escribe, NO el autor
        const { publication_comment, content_comment, comment_rating } = req.body;
        
        // El autor es el dueño del token (req.userId ya validado por el middleware)
        const author_id = req.userId; 

        // Verificamos que la publicación exista
        const publication = await Publication.findById(publication_comment);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        // Creamos el comentario asignando el autor internamente
        const comment = await Comment.create({
            author_comment: author_id, 
            publication_comment,
            content_comment,
            comment_rating
        });

        return res.status(201).json({
            success: true,
            message: 'Comentario creado exitosamente',
            data: comment
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al crear el comentario',
            error: error.message
        });
    }
};