import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../models/product';

const initProductState: ProductState = {
	products: [],
};

type ProductState = {
	products: Product[];
};

const defaultProducts = [
	{
		id: 1,
		name: 'A',
		price: 50,
	},
	{
		id: 2,
		name: 'B',
		price: 30,
	},
	{
		id: 3,
		name: 'C',
		price: 20,
	},
	{
		id: 4,
		name: 'D',
		price: 15,
	},
];

const productSlice = createSlice({
	name: 'product',
	initialState: initProductState,
	reducers: {
		loadProducts(state) {
			const products = localStorage.getItem('products');
			state.products = products ? JSON.parse(products) : defaultProducts;
		},
		addProduct(state, action) {
			const lastIndex = Math.max(...state.products.map((o) => o.id));
			action.payload.id = lastIndex + 1;
			state.products = state.products.concat(action.payload);
			localStorage.setItem('products', JSON.stringify(state.products));
		},
		removeProduct(state, action) {
			state.products = state.products.filter(
				(product) => product.id !== action.payload
			);
			localStorage.setItem('products', JSON.stringify(state.products));
		},
		updateProduct(state, action) {
			const productIndex = state.products.findIndex(
				(product) => product.id === action.payload.id
			);
			state.products[productIndex] = action.payload;
			localStorage.setItem('products', JSON.stringify(state.products));
		},
	},
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
