'use strict';

import mongoose, { version } from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        author_comment:{
            type: String,
            ref: 'User',
            required: [true,'The author of comment is required'],
        },
        publication_comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true,'The id of publication is required'],
        },
        content_comment:{
            type: String,
            maxlength: 250,
            required: [true, 'The content of comment is required'],
        },
        comment_rating:{
            type: Number,
            min: 1,
            max: 5,
            required: [true, 'The rating of comment is required'],
        }
    },{
        timestamps: true,
        versionKey: false
    }
);
export default mongoose.model('Comment', commentSchema);