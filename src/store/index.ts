import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product.state';
import ruleReducer from './rule.state';
import basketReducer from './basket.state';

const store = configureStore({
	reducer: {
		productReducer: productReducer,
		ruleReducer: ruleReducer,
		basketReducer: basketReducer,
	},
});

export default store;
