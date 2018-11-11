import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Article = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    author: {
        type: String
    }
});

export default mongoose.model('Article', Article);