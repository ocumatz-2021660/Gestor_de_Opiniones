import Comment from '../src/comment/comment.model.js';

//para verificar que el dueño de la publicacion si sea el que realizara el proceso
export const validateCommentOwnership = async (req, res, next) =>{
    try{
        const { id } = req.params;
        const uid = req.user._id; //usuario de la autenticacion (JWT)

        const comment = await Comment.findById(id);
        if(!comment){
            return res.status(404).json({
                success: false,
                message: 'comentario no encontrado',
            });
        }
        //Convierte los valores en texto y los compara para permitir el paso si es o no es el dueño de la publicacion
        if(comment.author_comment.toString() !== uid.toString()) {
            return res.status(403).json({
                success: falsae,
                message: 'Error: you dont have authorization to perform this action',                
            });
        }

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error verificando al dueño de la publicacion ',
            error: error.message,
        });
    }
}