'use strict';

import {
  uploadPublicationImage,
  handleCloudinaryUploadError,
} from './cloudinary-uploader.js';

const upload = uploadPublicationImage.single('image_publication');

export const optionalImageUpload = (req, res, next) => {
  console.log('Entrando a optionalImageUpload');
  upload(req, res, (err) => {
    console.log('Error en upload:', err);
    if (err) {
      return handleCloudinaryUploadError(err, req, res, next);
    }
    next();
  });
};
//hola