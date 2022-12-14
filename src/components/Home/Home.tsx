import React, { Fragment, useState } from 'react';

import styles from './Home.module.scss';
import Card from 'react-bootstrap/Card';
import { Currency } from '../UI/Currency';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../models/product';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { CartItem } from '../../models/cart-item';
import { BsXSquareFill } from 'react-icons/bs';
import Multiselect from 'multiselect-react-dropdown';

export function Home() {
	const products = useSelector((state: any) => state.productReducer.products);
	const [basket, setBasket] = useState([]);
	const dispatch = useDispatch();

	const removeItemHandler = (id: number) => {
		// dispatch(productActions.removeProduct(id));
	};

	return (
		<Fragment>
			<div className='row'>
				<div className='col-12'>
					<h4>Available Products</h4>
				</div>
				{products.map((product: Product) => (
					<div className='col-4 col-md-3 my-2' key={product.id}>
						<Card>
							<Card.Body className={styles.product__item}>
								<span>{product.name}</span>
								<Currency>{product.price}</Currency>
							</Card.Body>
						</Card>
					</div>
				))}
			</div>

			<div className='row'>
				<div className='col-md-6'></div>
				<div className='col-md-6'>
					<Multiselect
						options={this.state.options}
						selectedValues={this.state.selectedValue}
						onSelect={this.onSelect}
						onRemove={this.onRemove}
						displayValue='name'
					/>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-6'>
					<h4>Basket</h4>
					<ListGroup>
						{basket.map((item: CartItem) => (
							<ListGroup.Item className={styles.list__item} key={item.id}>
								{item.productName}
								<div>
									<Currency>{item.price}</Currency>
									<BsXSquareFill
										className={`${styles.list__item__icon} pointer text-danger`}
										onClick={removeItemHandler.bind(null, item.id)}
									/>
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>

				<div className='col-md-6'>
					<h4>Checkout Calculator</h4>
				</div>
			</div>
		</Fragment>
	);
}
