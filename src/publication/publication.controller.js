import Publication from './publication.model.js';
import {User} from '../users/user.model.js';


export const createPublication = async (req, res) =>{
    try{
        const {
            author_publication,
            title_publication,
            category_publication, 
            content_publication, 
            image_publication} = req.body;

        const usuarioExistente = await User.findByPk(author_publication);
        if(!usuarioExistente){
            return res.status(400).json({
                success: false,
                message: 'No existe el author de la publicacion'
            });
        }
    }catch(error){
        response.status(400).json({
            succes: false,
            message: 'Error al crear la publicacion',
            error: error.message
        });
    }
}
