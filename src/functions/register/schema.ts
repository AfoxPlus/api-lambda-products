export default {
    type: "list",
    properties: {
        name : {type: String, require: true}, 
        description : {type: String},
        imageUrl : {type: String},
        stock : {type: Number},
        price: {type: Number, require: true}, 
    },
    required: ['name', 'price']
  } as const;