const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: 'string',
        required: true,
    },
    options: {
        'A': {
            type: 'string',
            required: true,
        },
        'B': {
            type: 'string',
            required: true,
        },
        'C': {
            type: 'string',
            required: true,
        },
        'D': {
            type: 'string',
            required: true,
        },
    },
    answer: {
        type: 'string',
        enum: ['A', 'B', 'C', 'D'],
        required: true,
    },
},
    {
        versionKey: false,
        //timestamps: true,
    }
)

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;