import React, { FC } from 'react';
import CatchUp from './CatchUp';
import Infants from './Infants';

type Props = {};

const Forms: FC<Props> = (props) => {
    return (
        <div className='container-fluid py-5'>
            <h1 className='text-center'>Forms</h1>
            <CatchUp />
            <hr className='my-5' />
            <Infants />
        </div>
    );
};

export default Forms;
