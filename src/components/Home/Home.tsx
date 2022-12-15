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
import { ruleActions } from '../../store/rule.state';
import Button from 'react-bootstrap/Button';
import { basketActions } from '../../store/basket.state';

export function Home() {
	const products = useSelector((state: any) => state.productReducer.products);
	const rules = useSelector((state: any) => state.ruleReducer.rules);
	const basket = useSelector((state: any) => state.basketReducer.items);
	const selectedRules = useSelector(
		(state: any) => state.ruleReducer.selectedRules
	);
	const [enteredProductInput, setEnteredProductInput] = useState('');
	const dispatch = useDispatch();

	const inputChangeHandler = (event: React.SyntheticEvent) => {
		const input = event.target as HTMLInputElement;
		setEnteredProductInput(input.value);
	};

	const checkoutHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();

		dispatch(
			basketActions.addBasket({
				text: enteredProductInput,
				rules: selectedRules,
				products: products,
			})
		);
	};

	const removeItemHandler = (id: number) => {
		dispatch(basketActions.removeItem(id));
	};

	const onSelectRuleHandler = (selectedList: any, selectedItem: any) => {
		dispatch(ruleActions.addSelectedRule(selectedItem));
	};

	const onRemoveRuleHandler = (selectedList: any, removedItem: any) => {
		dispatch(ruleActions.removeSelectedRule(removedItem.id));
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

			<div className='row my-3'>
				<div className='col-12'>
					<h4>Checkout Calculator</h4>
				</div>
				<div className='col-md-6'>
					<Form onSubmit={checkoutHandler}>
						<Form.Group className='mb-3' controlId='formProductString'>
							<Form.Label>Product String</Form.Label>
							<Form.Control
								type='text'
								value={enteredProductInput}
								onChange={inputChangeHandler}
								placeholder='Input product name'
							/>
						</Form.Group>
						<Button variant='primary' type='submit'>
							Checkout
						</Button>
					</Form>
				</div>
				<div className='col-md-6'>
					<p className='my-1'>Discount Rules</p>
					<Multiselect
						options={rules}
						onSelect={onSelectRuleHandler}
						onRemove={onRemoveRuleHandler}
						placeholder='Select Discount rules'
						displayValue='text'
					/>
				</div>
			</div>

			<div className='row'>
				<div className='col-12'>
					<h4>Basket</h4>
					<ListGroup>
						{basket.map((item: CartItem) => (
							<ListGroup.Item className={styles.list__item} key={item.id}>
								{item.productName.toUpperCase()} - x{item.quantity}
								<div>
									{item.discountedPrice === item.originalPrice && (
										<Currency class='mx-3'>{item.originalPrice}</Currency>
									)}
									{item.discountedPrice !== item.originalPrice && (
										<Currency class='cancel'>{item.originalPrice}</Currency>
									)}
									{item.discountedPrice !== item.originalPrice && (
										<Currency class='mx-3'>{item.discountedPrice}</Currency>
									)}
									<BsXSquareFill
										className={`${styles.list__item__icon} pointer text-danger`}
										onClick={removeItemHandler.bind(null, item.id)}
									/>
								</div>
							</ListGroup.Item>
						))}

						<ListGroup.Item className={styles.list__item}>
							Total
							<Currency>
								{basket.length > 0
									? basket.reduce((accumulator: any, object: any) => {
											return accumulator + object.discountedPrice;
									  }, 0)
									: 0}
							</Currency>
						</ListGroup.Item>
					</ListGroup>
				</div>
			</div>
		</Fragment>
	);
}
