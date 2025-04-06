// models/Document.js

const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        collaborators: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        tags: [{
            type: String,
            trim: true
        }],
    },
    {
        timestamps: true // adds createdAt and updatedAt automatically
    }
);

module.exports = mongoose.model('Document', documentSchema);
