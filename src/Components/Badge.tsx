import React, { FC } from 'react';

type Props = {
	type: 'danger' | 'success' | 'warning' | 'secondary' | 'info' | 'dark';
};

const Badge: FC<Props> = ({ children }) => {
	return (
		<span style={{ height: '18px', width: '18px' }} className='badge badge-danger rounded-circle ml-1 text-center'>
			{children}
		</span>
	);
};

export default Badge;
