const path = require('path');
const fs = require('fs');

const cartData = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

const getProductsFromCart = (cb) => {
	fs.readFile(cartData, (err, fileContent) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

const getProductsFromFile = (cb) => {
	fs.readFile(cartData, (err, fileContent) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

module.exports = class Cart {
	static addProduct(id, productPrice) {
		fs.readFile(cartData, (err, fileContent) => {
			let cart = {
				products: [],
				totalPrice: 0,
			};
			if (!err) {
				cart = JSON.parse(fileContent);
			}
			const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id: id, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice = cart.totalPrice + +productPrice;

			fs.writeFile(cartData, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}
	static getProducts(cb) {
		fs.readFile(cartData, (err, fileContent) => {
			if (err) {
				let cart = {
					products: [],
					totalPrice: 0,
				};
				fs.writeFile(cartData, JSON.stringify(cart), (err) => {
					console.log(err);
				});
				cb(cart);
			} else {
				const cart = JSON.parse(fileContent);
				cb(cart);
			}
		});
	}

	static deleteProduct(id, productPrice) {
		fs.readFile(cartData, (err, fileContent) => {
			if (err) {
				return;
			}
			const updatedCart = { ...JSON.parse(fileContent) };
			const product = updatedCart.products.find((prod) => prod.id === id);
			const productQty = product.qty;
			updatedCart.products = updatedCart.products.filter((prod) => prod.id !== id);
			updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

			fs.writeFile(cartData, JSON.stringify(updatedCart), (err) => {
				console.log(err);
			});
		});
	}
};
