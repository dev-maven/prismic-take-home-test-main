import React, { useState } from 'react';

import styles from './Products.module.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsXSquareFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../models/product';
import { productActions } from '../../store/product.store';
import { Currency } from '../UI/Currency';

export function Products() {
	const products = useSelector((state: any) => state.productReducer.products);
	const dispatch = useDispatch();
	const [enteredName, setEnteredName] = useState('');
	const [enteredPrice, setEnteredPrice] = useState('');
	const [enteredId, setEnteredId] = useState('');
	const [enteredFormStatus, setFormStatus] = useState('Create');

	const formChangeHandler = (event: React.SyntheticEvent, type: string) => {
		const input = event.target as HTMLInputElement;
		if (type === 'Name') {
			setEnteredName(input.value);
		} else {
			setEnteredPrice(input.value);
		}
	};

	const formSubmissionHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();

		const formData = {
			id: +enteredId,
			name: enteredName,
			price: +enteredPrice,
		};

		if (enteredFormStatus === 'Create') {
			dispatch(productActions.addProduct(formData));
		} else {
			dispatch(productActions.updateProduct(formData));
		}

		resetFormHandler();
	};

	const removeProductHandler = (id: number) => {
		dispatch(productActions.removeProduct(id));
	};

	const resetFormHandler = () => {
		setEnteredName('');
		setEnteredPrice('');
		setEnteredId('');
		setFormStatus('Create');
	};

	const updateProductHandler = (product: Product) => {
		setFormStatus('Update');
		setEnteredName(product.name);
		setEnteredPrice(product.price.toString());
		setEnteredId(product.id.toString());
	};
	return (
		<div className={styles.Products}>
			<div className='row'>
				<div className='col-md-6'>
					<h4 className='m-3'>Available Products</h4>
					<ListGroup>
						{products.map((product: Product) => (
							<ListGroup.Item className={styles.list__item} key={product.id}>
								{product.name}
								<div>
									<Currency>{product.price}</Currency>
									<BsPencilSquare
										onClick={updateProductHandler.bind(null, product)}
										className={`${styles.list__item__icon} pointer text-secondary me-2 ms-3`}
									/>

									<BsXSquareFill
										className={`${styles.list__item__icon} pointer text-danger`}
										onClick={removeProductHandler.bind(null, product.id)}
									/>
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
				<div className='col-md-6'>
					<h4 className='text-center m-3'> Add New Products</h4>
					<Form onSubmit={formSubmissionHandler}>
						<Form.Group className='mb-3' controlId='formName'>
							<Form.Label>Product Name</Form.Label>
							<Form.Control
								type='text'
								value={enteredName}
								onChange={(event) => formChangeHandler(event, 'Name')}
								placeholder='Input product name'
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formPrice'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								value={enteredPrice}
								onChange={(event) => formChangeHandler(event, 'Price')}
								placeholder='Input price'
							/>
						</Form.Group>
						<Button
							variant='primary'
							type='submit'
							disabled={!enteredName || !enteredPrice}
						>
							{enteredFormStatus === 'Create' ? 'Save' : 'Update'}
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
