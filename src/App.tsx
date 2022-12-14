import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Rules } from './components/Rules/Rules';
import { Home } from './components/Home/Home';
import React from 'react';
import { Header } from './components/Header/Header';
import { Products } from './components/Products/Products';
import { useDispatch } from 'react-redux';
import { productActions } from './store/product.store';
import { ruleActions } from './store/rule.store';

function App() {
	const dispatch = useDispatch();
	dispatch(productActions.loadProducts());
	dispatch(ruleActions.loadRules());
	return (
		<Fragment>
			<Header />
			<main className='container'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/rules' element={<Rules />} />
					<Route path='/products' element={<Products />} />
				</Routes>
			</main>
		</Fragment>
	);
}

export default App;
