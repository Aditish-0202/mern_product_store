

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    price :{
        type: Number,
        required: true
    },

    image:{
        type: String,
        required: true
    },
},{
    timestamps:true // createdAt and updatedAt 
});

const Product = mongoose.model('Product', productSchema);
// the above line says that we are creating a model called Product and it will be based on the productSchema we defined above.

// The model is used to interact with the database, such as creating, reading, updating, and deleting products.

// we have made the name of the models Product as mongoose will automatically convert it to lowercase and pluralize it to create the collection name in the database, which will be 'products'.


export default Product;