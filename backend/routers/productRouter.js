import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import {isAuth, isAdmin,isSellerOrAdmin} from '../util.js';
import User from '../models/userModel.js';



const productRouter = express.Router();
productRouter.get('/', expressAsyncHandler(async(req,res)=>{
  const name = req.query.name || '';
  const category = req.query.category || '';
  const seller = req.query.seller || '';
  const order = req.query.order || '';
  const min =
  req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min): 0;
  const max =
  req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max): 0;
  const rating =
  req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating):0;
  const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
  const sellerFilter = seller ? { seller } : {};
  const categoryFilter = category ?{category} :{};
  const priceFilter = min && max ? {price :{$gte: min, $lte: max}}:{};
  const ratingFilter = rating ?{rating:{$gte: rating}}: {};
  const sortOrder =
  order === 'lowest'
  ?{price: 1}
  : order ==='highest'
  ? {price: -1}
  : order === 'toprated'
  ?{rating:-1}
  :{_id:-1};
  const products = await Product.find({
    ...sellerFilter,
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  }).populate('seller', 'seller.name seller.logo')
  .sort(sortOrder);
  res.send(products);
})
);
productRouter.get('/categories', expressAsyncHandler(async(req,res)=>{
  const categories = await Product.find().distinct('category');
  res.send(categories);
}))
productRouter.get('/seed', expressAsyncHandler(async(req, res)=>{
  // await Product.remove({});
  const seller = await User.findOne({ isSeller: true });

  if (seller) {
    const products = data.products.map((product) => ({
      ...product,
      seller: seller._id,
    }));
    const createdProducts = await Product.insertMany(products);
    res.send({ createdProducts });
  } else {
    res
      .status(500)
      .send({ message: 'No seller found. first run /api/users/seed' });
  }
}));
productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id).populate(
        'seller',
        'seller.name seller.logo seller.rating seller.numReviews'
      );
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );

  productRouter.post(
    '/',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async(req,res)=>{
      const product = new Product({
        name: 'sample name' +Date.now(),
        seller: req.user._id,
        image: 'data:image/jpeg;base64,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',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',

      });
      const createdProduct = await product.save();
      res.send({message: 'Prodcut Created', product: createdProduct});
    })
  );

  productRouter.put(
    '/:id',
    isAuth,
    isSellerOrAdmin,

    expressAsyncHandler(async(req,res)=>{
      const productId = req.params.id;
      const product  = await Product.findById(productId);
      if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({message: 'Product Updated', product: updatedProduct});
      }
      else{
        res.status(404).send({message: 'Product Not Found'})
      }
    })
  );

  productRouter.delete(
'/:id',
isAuth,
isAdmin,
expressAsyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id);
  if(product){
    const deleteProduct = await product.remove();
    res.send({message: 'Product Deleted', product: deleteProduct});

  }else{
    res.send(404).send({message:'Product Not Found'});
  }
})

);
productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
export default productRouter;