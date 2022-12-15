import React from 'react';

export const Currency = (props: any) => {
	return <span className={props.class}> ${props.children}</span>;
};
