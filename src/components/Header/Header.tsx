import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

export function Header() {
	return (
		<header className={styles.header}>
			<NavLink to='/' className={styles.logo__text}>
				<h1>Maven checkout</h1>
			</NavLink>
			<div className='flex-div'>
				<NavLink to='/rules' className={`me-3 ${styles.nav__button}`}>
					Rules
				</NavLink>
				<NavLink to='/products' className={styles.nav__button}>
					Products
				</NavLink>
			</div>
		</header>
	);
}
