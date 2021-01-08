/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
      },
      process.env.JWT_SECRET || 'somethingsecret',
      {
        expiresIn: '30d',
      }
    );
  };

  export const isAuth =(req, res, next) =>{
    const authorization = req.headers.authorization;
    if(authorization){
      const token = authorization.slice(7, authorization.length); //bearer xxxxx
      jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret',(err, decode) =>{
        if(err) {
          req.status(401).send({message: 'Invalid Token'});

        }
        else{
          req.user = decode;
          next();
        }
      });
    }
    else{
      req.status(401).send({message: 'NO Token'});
    }
  };
  export const isAdmin= (req,res,next) =>{
    if(req.user && req.user.isAdmin){
      next();

    }else{
      req.status(401).send({message: 'Invalid Admin Token'});

    }
  };
  export const isSeller = (req, res, next) => {
    if (req.user && req.user.isSeller) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Seller Token' });
    }
  };
  export const isSellerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin/Seller Token' });
    }
  };
  export const prices = [
  {
    name: 'Any',
    min: 0,
    max: 0,
  },
  {
    name: `$1 to $10`,
    min: 1,
    max: 10,
  },
  {
    name: `$10 to $100`,
    min: 10,
    max: 100,
  },
  {
    name: `$100 to $1000`,
    min: 100,
    max: 1000,
  },
];
export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },

  {
    name: '3stars & up',
    rating: 3,
  },

  {
    name: '2stars & up',
    rating: 2,
  },

  {
    name: '1stars & up',
    rating: 1,
  },
];
