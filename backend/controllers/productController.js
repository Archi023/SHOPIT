const Product =require('../models/product')

const ErrorHandler =require('../utils/errorHandler');
const catchAsyncErrors =require('../middlewares/catchAsyncErrors')
const  APIFeatures =require('../utils/apiFeatures')

//create new product  => /api/v1/product/new
exports.newProduct = catchAsyncErrors  (async (req, res, next) => {

      const product =await Product.create(req.body);

      res.status(201).json({
        success:true,
        product
      })
})
// Get all products => /api/v1/products?keyword=apple

exports.getProducts =catchAsyncErrors (async (req,res,next) => {
    
    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)

    const products = await apiFeatures.query;

    res.status(200).json({
        success:true,
        count:products.length,
        productCount,
        products
    })
})

//Get single products details => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product =await Product.findById(req.params.id);

    if(!product){
        return next (new ErrorHandler('Product not Found', 404));
        }
    
    res.status(200).json({
        success:true,
        product
    })
})

//  Update product =>  /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) =>{
    let product = await Product.findById(req.params.id);
   
    if(!product){
        return next (new ErrorHandler('Product not Found', 404));
    
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    });
    res.status(200).json({
        success:true,
        product
    })
})
// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct =catchAsyncErrors (async (req, res,next) =>
{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next (new ErrorHandler('Product not Found', 404));
    }
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:'Product is deleted.'
    })
})

// review
// create review => /api/v1/review
exports.createProductReview = catchAsyncErrors ( async (req,res,next) => {
    
    const {rating, comment, productID} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.UserName,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productID);

    const isReviewed = await product.reviews.find(
        r => r.user.toString() === review.user._id.toString()
    )
    
    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === review.user._id.toString()) {
                review.comment = comment ; 
                review.rating = rating;
            }
        })
    }else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.rating = product.reviews.reduce((acc , item) => item.rating + acc,0) / product.reviews.length;

    await product.save({validateBeforeSave:false}); 

    res.status(201).json({
        success: true
    })
})

// Get Product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors ( async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Reviews => /api/v1/reviews
exports.deleteProductReviews = catchAsyncErrors ( async (req, res, next) => {
    const product = await Product.findById(req.query.productID);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;
    
    const ratings = product.reviews.reduce((acc , item) => item.rating + acc,0) / product.reviews.length;

    await Product.findByIdAndUpdate(req.query.productID, {
        reviews,
        ratings,
        numOfReviews
    },{
        new: true,
        runValidators:true
    });

    res.status(200).json({
        success: true
    })
})