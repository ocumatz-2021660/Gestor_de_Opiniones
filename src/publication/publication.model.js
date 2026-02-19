'use strict';

import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema(
    {
        title_publication: {
            type: String,
            required: [true, 'The title of publication is required'],
            maxlength: 100

        },
        category_publication: {
            type: String,
            required: [true, 'The category of publication is required'],
            enum: {
                values: ['TECHNOLOGY', 'SPORTS', 'SCIENCE', 'EDUCATION', 'ENTERTAINMENT', 'OTHER'],
                message: 'The category does not exist'
            },
            uppercase: true
        },

        content_publication: {
            type: String,
            required: [true, 'The content of publicaction is required'],
            maxlength: 250
        },
        time_publication: {
            type: Date,
            default: Date.now
        },
        //Campo opcional para agregar imagen
        image_publication: {
            type: DataTypes.String(512),
            defaultValue: '',
            field: 'image_publication',
        }


    }, {
    timestamps: true,
    versionKey: false
}
);
publicationSchema.index({category_publication: 1});

export default mongoose.model('Publication', publicationSchema);