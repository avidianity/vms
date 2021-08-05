import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import logo from '../Assets/logo.svg';
import { routes } from '../routes';

type Props = {};

const Home: FC<Props> = (props) => {
	const id = v4();
	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-light shadow' style={{ backgroundColor: '#fff' }}>
				<Link to={routes.HOME} className='navbar-brand'>
					<img src={logo} alt='VMSS' style={{ height: '30px', width: '30px' }} />
				</Link>
				<button className='navbar-toggler' type='button' data-toggle='collapse' data-target={`#${id}`}>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id={id}>
					<ul className='navbar-nav ml-auto mr-2'>
						<li className='nav-item'>
							<Link to={routes.LOGIN} className='nav-link'>
								<i className='fas fa-sign-in-alt'></i>
								Login
							</Link>
						</li>
						<li className='nav-item'>
							<Link to={routes.REGISTER} className='nav-link'>
								<i className='fas fa-user-circle'></i>
								Register
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Home;
