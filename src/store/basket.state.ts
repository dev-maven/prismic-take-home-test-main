import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { Rule } from '../models/rule';

const initBasketState: BasketState = {
	items: [],
};

type BasketState = {
	items: CartItem[];
};

const getCount = (list: string) =>
	list.split('').reduce((a: any, c) => (a[c] = ++a[c] || 1) && a, {});

const calculatePrice = (
	count: number,
	price: number,
	quantity: number,
	percentage: number
) => {
	let total = 0;
	if (percentage && quantity) {
		const discountTimes = Math.floor(count / quantity);
		const discountItems = discountTimes * quantity;
		const nonDiscountItems = count - discountItems;
		const nonDiscountedPrice = nonDiscountItems * price;
		const discountedPriceTotal = discountItems * price;
		const discountedPrice =
			discountedPriceTotal - discountedPriceTotal * (percentage / 100);
		total = nonDiscountedPrice + discountedPrice;
	} else {
		total = price * count;
	}
	return Math.floor(total);
};

const basketSlice = createSlice({
	name: 'item',
	initialState: initBasketState,
	reducers: {
		addBasket(state, action) {
			state.items = [];

			const frequencyObject = getCount(action.payload.text.toLowerCase());
			const keys = Object.keys(frequencyObject);
			keys.forEach((key) => {
				const productQuantity = frequencyObject[key];
				const productPrice = action.payload.products.find(
					(product: Product) => product.name.toLowerCase() === key
				).price;
				const productPercentage = action.payload.rules.find(
					(rule: Rule) => rule.product.toLowerCase() === key
				)?.percentage;
				const discountQuantity = action.payload.rules.find(
					(rule: Rule) => rule.product.toLowerCase() === key
				)?.quantity;
				const index = state.items.length + 1;
				const itemObject = {
					id: index,
					productName: key,
					quantity: productQuantity,
					price: productPrice,
					originalPrice: productPrice * productQuantity,
					discountedPrice: calculatePrice(
						productQuantity,
						productPrice,
						discountQuantity,
						productPercentage
					),
				};
				state.items = state.items.concat(itemObject);
			});
		},
		removeItem(state, action) {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
	},
});

export const basketActions = basketSlice.actions;

export default basketSlice.reducer;
