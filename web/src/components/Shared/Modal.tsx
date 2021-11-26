import React, { forwardRef } from 'react';
import { v4 } from 'uuid';

type Props = {
	title: string;
	footer?: any;
	children: React.ReactNode;
};

const Modal = forwardRef<HTMLDivElement, Props>(({ title, footer, children }, ref) => {
	const id = v4();

	return (
		<div ref={ref} className='modal fade' tabIndex={-1} role='dialog' aria-labelledby={id} aria-hidden='true'>
			<div className='modal-dialog modal-lg modal-dialog-centered' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title font-weight-normal' id={id}>
							{title}
						</h5>
						<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className='modal-body'>{children}</div>
					<div className='modal-footer'>
						{footer}
						<button type='button' className='btn bg-gradient-secondary btn-sm' data-bs-dismiss='modal'>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Modal;
