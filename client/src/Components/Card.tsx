import React, { FC } from 'react';
import { outIf, toBool } from '../helpers';

type Props = {
	className?: string;
};

const Card: FC<Props> = ({ className, children }) => {
	return (
		<div className={`card shadow border-0 ${outIf(toBool(className), className)}`} style={{ borderRadius: '10px' }}>
			<div className='card-body'>{children}</div>
		</div>
	);
};

export default Card;
