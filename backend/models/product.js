const mongoose =require('mongoose')

const validColors = [
        "red", 
        "blue", 
        "green", 
        "yellow", 
        "black",
        "white",
        "gold"
    ];

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Product name '],
        trim: true,
        maxLength: [100,'Product name can not exceed 100 characters ']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [ 
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'MenClothing',          //Includes products such as T-shirts, shirts, jeans, trousers, jackets, sweatshirts, and blazers.
                'WomenClothing',        //Includes products such as sarees, kurtas, salwar suits, dresses, tops, jeans, skirts, and jackets.
                'KidsClothing',         //Includes products such as dresses, t-shirts, shirts, skirts, shorts, jeans, and jackets for boys and girls.
                'Accessories',          //Includes products such as bags, backpacks, wallets, belts, watches, sunglasses, and jewellery for men, women, and kids.
                'Beauty/PersonalCare',  //Includes products such as makeup, skincare, haircare, fragrances, grooming, and wellness products.
                'Home/Living'           //Includes products such as bedsheets, curtains, cushion covers, blankets, rugs, and home decor items.
            ],
            message: 'Please select correct category for product'
        }
    },
    brand: {
        type: String,
        required: [true, 'Please enter Brand name']
    },
    size: {
        type: String,
        enum: [
            'OneSize', 
            'XS',
            'S',
            'M',
            'L',
            'XL',
            'XXL',
            'XXXL',
            '0-6M',
            '6-12M',
            '1-2Y',
            '2-3Y',
            '3-4Y',
            '4-5Y',
            '5-6Y',
            '6-7Y',
            '7-8Y',
            '8-9Y',
            '9-10Y',
            '10-11Y',
            '11-12Y',
            '12-13Y',
            '13-14Y',  
        ],
        default: 'OneSize',
    },
    color: { 
        type: String, 
        required: true,
        validate: {
            validator: function(value) {
                return validColors.includes(value);
            },
            message: props => `${props.value} is not a valid color!`
        }
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports =mongoose.model('Product', productSchema);