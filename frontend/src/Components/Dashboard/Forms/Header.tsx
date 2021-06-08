import React, { FC } from 'react';
import doh from '../../../Assets/doh.png';
import logo from '../../../Assets/logo.svg';

type Props = {};

const Header: FC<Props> = (props) => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-4 d-flex'>
                    <img
                        src={doh}
                        alt='DOH'
                        style={{ height: '80px', width: '80px' }}
                        className='ml-auto'
                    />
                </div>
                <div className='col-4 text-center'>
                    <p className='mb-0'>Republic of the Philippines</p>
                    <p className='mb-0'>DEPARTMENT OF HEALTH</p>
                    <h6 className='font-weight-bold'>
                        CENTER FOR HEALTH DEVELOPMENT
                    </h6>
                    <h6 className='font-weight-bold'>WESTERN VISAYAS</h6>
                </div>
                <div className='col-4 d-flex'>
                    <img
                        src={logo}
                        alt='DOH'
                        style={{ height: '80px', width: '80px' }}
                        className='mr-auto shadow border rounded-circle'
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
