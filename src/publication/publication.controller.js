import Publication from './publication.model.js';
import { deleteImage } from '../../helpers/cloudinary-service.js';
import { User } from '../users/user.model.js';
import { formatPublication } from '../../helpers/publication-helpers.js';

export const createPublication = async (req, res) => {
    try {
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
            data: formatPublication(publication),
        })
        const usuarioExistente = await User.findByPk(author_publication);
        if (!usuarioExistente) {
            return res.status(400).json({
                success: false,
                message: 'No existe el author de la publicacion'
            });
        }
    } catch (error) {

        if (req.file?.path) {
            await deleteImage(req.file.path);
        }

        response.status(400).json({
            succes: false,
            message: 'Error al crear la publicacion',
            error: error.message
        });
    }
};

export const getPublications = async (req, res) => {
    try {

        const { category, page = 1, limit = 10 } = req.query;

        const filter = {};
        if (category) {
            filter.category_publication = category.toUpperCase();
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [publications, total] = await Promise.all([
            Publication.find(filter)
                .sort({ title_publication: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Publication.countDocuments(filter),
        ]);

        return res.status(200).json({
            success: true,
            data: publications.map(formatPublication),
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            }
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al obtener las publicaciones',
            error: error.message,
        });
    }
};

export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;

        const publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'No se encontro la publicacion',
            });
        }
        return res.status(200).json({
            success: true,
            data: formatPublication(publication),
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al obtener la publicacion',
            error: error.message,
        });
    }
}

export const updatePublication = async (req, res) => {
    try {

        const { id } = req.params;

        const publication = await Publication.findById(id);
        if (!publication) {
            if (req.file?.path) {
                await deleteImage(req.file.path).catch(() => { });
            }
            return res.status(404).json({
                success: false,
                message: 'No se encontro la publicacion',
            });
        }
        if (publication.author_publication !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para editar esta publicación',
            });
        }

        const {
            title_publication,
            category_publication,
            content_publication,
        } = req.body;
        //solo si estan dentro del body
        if (title_publication !== undefined)
            publication.title_publication = title_publication;
        if (category_publication !== undefined)
            publication.category_publication = category_publication;
        if (content_publication !== undefined)
            publication.content_publication = content_publication;

        if (req.file?.path) {
            if (publication.image_publication) {
                await deleteImage(publication.image_publication).catch(() => { });
            }
            publication.image_publication = req.file.path;
        }
        if (req.body.remove_image === 'true' && !req.file) {
            if (publication.image_publication) {
                await deleteImage(publication.image_publication).catch(() => { });
            }
            //por si esta vasio
            publication.image_publication = '';
        }
        await publication.save();
        return res.status(200).json({
            success: true,
            message: 'Actualizacion exitosa',
            data: formatPublication(publication),
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al acutalizar publicacion',
            error: error.message,
        })
    }
};

export const deletePublication = async (req, res) => {
    try {

        const { id } = req.params;

        const publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'No se encontro la publicacion',
            });
        }
        if (publication.author_publication !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar esta publicación',
            });
        }
        if (publication.image_publication) {
            await deleteImage(publication.image_publication).catch(() => { });
        }
        await Publication.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'Publicacion eliminada exitosamente',
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al eliminar publicacion',
            error: error.message,
        });
    }
}