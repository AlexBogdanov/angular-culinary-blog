import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Recipe = new Schema({
    name: {
        type: String
    },
    preparation: {
        type: String
    },
    products: {
        type: []
    }
});

export default mongoose.model('Recipe', Recipe);