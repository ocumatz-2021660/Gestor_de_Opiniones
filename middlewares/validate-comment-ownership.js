import Comment from '../src/comment/comment.model.js';

export const validateCommentOwnership = async (req, res, next) => {
    try {
        const { id } = req.params;
        const loggedUserId = String(req.userId).trim();

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' });

        // Si el ID guardado no es igual al del token, rechaza
        if (String(comment.author_comment).trim() !== loggedUserId) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso: No eres el autor de este comentario'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error de validación', error: error.message });
    }
};