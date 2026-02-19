import Publication from './publication.model.js';
import { deleteImage}from '../../helpers/cloudinary-service.js';
import {User} from '../users/user.model.js';


export const createPublication = async (req, res) =>{
    try{
        const {
            author_publication,
            title_publication,
            category_publication, 
            content_publication, 
            } = req.body;
            //para comparar si tiene algun archivo o no
            const image_publication = req.file?.path || '';

            const publication = await Publication.create({
                author_publication,
                title_publication,
                category_publication, 
                content_publication, 
                image_publication   
            });

            return res.status(201).json({
                success: true,
                message: 'Publicacion creada exitosamente',                
            })

        const usuarioExistente = await User.findByPk(author_publication);
        if(!usuarioExistente){
            return res.status(400).json({
                success: false,
                message: 'No existe el author de la publicacion'
            });
        }
    }catch(error){

        if(req.file?.path){
            await deleteImage(req.file.path);
        }

        response.status(400).json({
            succes: false,
            message: 'Error al crear la publicacion',
            error: error.message
        });
    }
}
