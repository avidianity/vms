import React, { FC } from 'react';

type Props = {};

const Card: FC<Props> = (props) => {
	return (
		<div className='card shadow border-0' style={{ borderRadius: '10px' }}>
			<div className='card-body'>{props.children}</div>
		</div>
	);
};

export default Card;
