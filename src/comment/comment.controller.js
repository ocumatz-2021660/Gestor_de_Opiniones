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

export const getComments = async (req, res) => {
    try {
        const { publicationId } = req.query;
        const filter = publicationId ? { publication_comment: publicationId } : {};

        const comments = await Comment.find(filter)
            .sort({ createdAt: -1 }) // Los más recientes primero
            .populate('publication_comment', 'title_publication'); // Trae el título de la publicación de Mongo

        return res.status(200).json({
            success: true,
            total: comments.length,
            data: comments
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al obtener los comentarios',
            error: error.message
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params; // ID del comentario en Mongo
        const { content_comment, comment_rating } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { content_comment, comment_rating },
            { new: true, runValidators: true } 
        );

        return res.status(200).json({
            success: true,
            message: 'Comentario actualizado correctamente',
            data: updatedComment
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al actualizar el comentario',
            error: error.message
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Comentario eliminado exitosamente'
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al eliminar el comentario',
            error: error.message
        });
    }
};
