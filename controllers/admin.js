const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		edit: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(null, title, imageUrl, description, price);
	product.save();
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/products',
		});
	});
};

exports.getEditProduct = (req, res, next) => {
	let edit = req.query.edit;
	let productId = req.params.productId;
	Product.fetchById(productId, (product) => {
		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			edit: true,
			product: product,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const id = req.body.productID;
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const updatedProduct = new Product(id, title, imageUrl, description, price);
	updatedProduct.save();
	res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
	const productID = req.body.productId;
	Product.deleteById(productID);
	res.redirect('/admin/products');
};
