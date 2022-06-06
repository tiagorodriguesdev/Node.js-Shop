const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'All Products',
			path: '/products',
		});
	});
};

exports.getProduct = (req, res, next) => {
	const prodID = req.params.productId;
	Product.fetchById(prodID, (product) => {
		res.render('shop/product-detail', {
			product: product,
			pageTitle: product.title,
			path: '/products',
		});
	});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop/index', {
			prods: products,
			pageTitle: 'Shop',
			path: '/',
		});
	});
};

exports.getCart = (req, res, next) => {
	Cart.getProducts((cart) => {
		if (!null) {
			Product.fetchAll((products) => {
				const cartProducts = [];
				const cartTotalPrice = cart.totalPrice;
				for (product of products) {
					const cartProductsData = cart.products.find((prod) => prod.id === product.id);
					if (cartProductsData) {
						cartProducts.push({ productData: product, qty: cartProductsData.qty });
					}
				}
				res.render('shop/cart', {
					path: '/cart',
					pageTitle: 'Your Cart',
					products: cartProducts,
					cartTotals: cartTotalPrice,
				});
			});
		} else {
			res.render('shop/cart', {
				path: '/cart',
				pageTitle: 'Your Cart',
			});
		}
	});
};

exports.postCart = (req, res, next) => {
	const prodID = req.body.productId;
	Product.fetchById(prodID, (product) => {
		Cart.addProduct(prodID, product.price);
	});
	res.redirect('/');
};

exports.postDeleteProductFromCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.fetchById(prodId, (product) => {
		Cart.deleteProduct(prodId, product.price);
		res.redirect('/cart');
	});
};

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		path: '/orders',
		pageTitle: 'Your Orders',
	});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout',
	});
};
