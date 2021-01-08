import bcrypt from 'bcryptjs';

const data= {
    users:[
        {
            name: 'kashif',
            email: 'admin@kashif.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
            isSeller: true,
            
            seller: {
              name: 'Puma',
              logo: '/uploads/1609852671184.jpg',
              description: 'best seller',
              rating: 4.5,
              numReviews: 120,
            },
        },
          {
            name: 'Rashif',
            email: 'Rashid@example.com',
            password: bcrypt.hashSync('2345', 8),
            isAdmin: false,
        },


    ],
    products: [
        {
            name: 'nike slim shirt',
            category:'shirts',
            image:'https://images-na.ssl-images-amazon.com/images/I/41loSuXdfmL.jpg',
            price: '120',
            countInStock:7,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',

        },
                {
            name: 'Adidas Fit Shirt',
            category:'shirts',
            image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp9DVx0a8cIYAC1sCFTekjjxtRpok-UVn4CFSivOrmVFoDgagBqRhO81TO_SrU7Fp0fJHJss0&usqp=CAc',
            price: '100',
            countInStock:9,

            brand: 'Adidas',
            rating: 4.0,
            numReviews: 4,
            description: 'high quality product',

        },
                {
            name: 'lacoste FreeFit Shirt',
            category:'shirts',
            image:'data:image/jpeg;base64,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',
            price: '180',
            countInStock:6,

            brand: 'Lacoste',
            rating: 3.5,
            numReviews: 4,
            description: 'high quality product',

        },
                {
            name: 'Pepe Jeans London',
            category:'shirts',
            image:'https://images-na.ssl-images-amazon.com/images/I/51PE8Aj%2BaAL._UY550_.jpg',
            price: '160',
            countInStock:0,

            brand: 'Pepe jeans London',
            rating: 5,
            numReviews: 15,
            description: 'high quality product',

        },
                {
            name: 'American Bentton',
            category:'shirts',
            image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPm7zlMZuwl7j4b4AXKp94lHE1axGurGRRfg&usqp=CAU',
            price: '240',
            countInStock:2,

            brand: 'American Bentton',
            rating: 5,
            numReviews: 9,
            description: 'high quality product',

        },
                {
            name: 'Levis',
            category:'shirts',
            image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQzRQ4CEgSQ42c4gDsoJiYv6y1lffDa6yRmEfafabWXAQGLwxbc-8ISL7eahjNsGVGZKQmkAs&usqp=CAc',
            price: '90',
            countInStock:3,

            brand: 'Levis',
            rating: 4.8,
            numReviews: 18,
            description: 'high quality product',

        },

    ],
};

export default data;