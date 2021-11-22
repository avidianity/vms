import React, { FC } from 'react';

type Element = string | JSX.Element | JSX.Element[];

type Props = {
	id: string;
	title: Element;
	buttons: Element;
	size?: 'sm' | 'md' | 'lg' | 'xl';
};

const Modal: FC<Props> = ({ id, title, buttons, children, size }) => {
	const dismiss = () => $(`#${id}`).modal('hide');

	return (
		<div className='modal fade text-dark' id={id} tabIndex={-1} aria-labelledby={`${id}label`} aria-hidden='true'>
			<div className={`modal-dialog modal-dialog-centered modal-${size || 'md'}`}>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id={`${id}label`}>
							{title}
						</h5>
						<button
							type='button'
							className='close'
							onClick={(e) => {
								e.preventDefault();
								dismiss();
							}}
							aria-label='Close'>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className='modal-body'>{children}</div>
					<div className='modal-footer'>
						{buttons}
						<button
							type='button'
							className='btn btn-secondary btn-sm'
							onClick={(e) => {
								e.preventDefault();
								dismiss();
							}}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
