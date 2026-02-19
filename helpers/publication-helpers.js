'use strict';

export const formatPublication = (pub) => {
  const data = {
    id: pub._id,
    author_publication: pub.author_publication,
    title_publication: pub.title_publication,
    category_publication: pub.category_publication,
    content_publication: pub.content_publication,
    time_publication: pub.time_publication,
    createdAt: pub.createdAt,
    updatedAt: pub.updatedAt,
  };

  // Solo se incluye imagen en la respuesta si existe
  if (pub.image_publication) {
    data.image_publication = pub.image_publication;
  }

  return data;
};