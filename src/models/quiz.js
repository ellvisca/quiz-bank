const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: {
        type: 'string',
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]
},  
    {
        versionKey: false,
        //timestamps: true,
    }
)

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;