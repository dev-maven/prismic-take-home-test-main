import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product.store';
import ruleReducer from './rule.store';

const store = configureStore({
	reducer: {
		productReducer: productReducer,
		ruleReducer: ruleReducer,
	},
});

export default store;
