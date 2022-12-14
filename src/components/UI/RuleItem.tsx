import React from 'react';
import { Fragment } from 'react';

export const RuleItem = (props: any) => {
	return (
		<Fragment>
			{props.percentage}% off {props.quantity} {props.product} items
		</Fragment>
	);
};
