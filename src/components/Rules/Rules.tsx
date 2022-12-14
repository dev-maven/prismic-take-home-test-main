import React, { useState } from 'react';

import styles from './Rules.module.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsXSquareFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { ruleActions } from '../../store/rule.store';
import { Rule } from '../../models/rule';
import { RuleItem } from '../UI/RuleItem';
import { Product } from '../../models/product';

export function Rules() {
	const rules = useSelector((state: any) => state.ruleReducer.rules);
	const products = useSelector((state: any) => state.productReducer.products);
	const dispatch = useDispatch();
	const [enteredProduct, setEnteredProduct] = useState('A');
	const [enteredQuantity, setEnteredQuantity] = useState('');
	const [enteredPercentage, setEnteredPercentage] = useState('');
	const [enteredId, setEnteredId] = useState('');
	const [enteredFormStatus, setFormStatus] = useState('Create');

	const formChangeHandler = (event: React.SyntheticEvent, type: string) => {
		const input = event.target as HTMLInputElement;
		if (type === 'Product') {
			setEnteredProduct(input.value);
		} else if (type === 'Quantity') {
			setEnteredQuantity(input.value);
		} else {
			setEnteredPercentage(input.value);
		}
	};

	const formSubmissionHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();

		const formData = {
			id: +enteredId,
			product: enteredProduct,
			quantity: +enteredQuantity,
			percentage: +enteredPercentage,
		};

		if (enteredFormStatus === 'Create') {
			dispatch(ruleActions.addRule(formData));
		} else {
			dispatch(ruleActions.updateRule(formData));
		}

		resetFormHandler();
	};

	const resetFormHandler = () => {
		setEnteredProduct('A');
		setEnteredQuantity('');
		setEnteredPercentage('');
		setEnteredId('');
		setFormStatus('Create');
	};

	const removeRuleHandler = (id: number) => {
		dispatch(ruleActions.removeRule(id));
	};

	const updateRuleHandler = (rule: Rule) => {
		setFormStatus('Update');
		setEnteredProduct(rule.product);
		setEnteredPercentage(rule.percentage.toString());
		setEnteredQuantity(rule.quantity.toString());
		setEnteredId(rule.id.toString());
	};

	return (
		<div className={styles.Rules}>
			<div className='row'>
				<div className='col-md-6'>
					<h4 className='m-3'>Available Rules</h4>
					<ListGroup>
						{rules.map((rule: Rule) => (
							<ListGroup.Item className={styles.list__item}>
								<RuleItem
									key={rule.id}
									percentage={rule.percentage}
									quantity={rule.quantity}
									product={rule.product}
								/>
								<div>
									<BsPencilSquare
										onClick={updateRuleHandler.bind(null, rule)}
										className={`${styles.list__item__icon} pointer text-secondary me-2`}
									/>

									<BsXSquareFill
										onClick={removeRuleHandler.bind(null, rule.id)}
										className={`${styles.list__item__icon} pointer text-danger`}
									/>
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
				<div className='col-md-6'>
					<h4 className='text-center m-3'> Add New Rule</h4>
					<Form onSubmit={formSubmissionHandler}>
						<Form.Group className='mb-3' controlId='formProduct'>
							<Form.Label>Select Product</Form.Label>
							<Form.Select
								value={enteredProduct}
								onChange={(event) => formChangeHandler(event, 'Product')}
							>
								{products.map((product: Product) => (
									<option>{product.name}</option>
								))}
							</Form.Select>
						</Form.Group>

						<Form.Group className='mb-3' controlId='formQuantity'>
							<Form.Label>Quantity for discount</Form.Label>
							<Form.Control
								type='number'
								value={enteredQuantity}
								onChange={(event) => formChangeHandler(event, 'Quantity')}
								placeholder='Input quantity that qualifies for discount'
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formPercentage'>
							<Form.Label>Percentage discount</Form.Label>
							<Form.Control
								type='number'
								value={enteredPercentage}
								onChange={(event) => formChangeHandler(event, 'Percentage')}
								placeholder='Input percentage discount'
							/>
						</Form.Group>
						<Button
							variant='primary'
							type='submit'
							disabled={
								!enteredProduct || !enteredQuantity || !enteredPercentage
							}
						>
							Submit
						</Button>
						<Button
							variant='danger'
							type='button'
							onClick={resetFormHandler}
							className='ms-3'
						>
							Cancel
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}
