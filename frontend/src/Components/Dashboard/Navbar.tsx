import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { outIf } from '~/helpers';
import { useURL } from '~/hooks';
import { routes } from '~/routes';

type Props = {};

const Navbar: FC<Props> = (props) => {
    const [menu, setMenu] = useState(false);
    const url = useURL();

    return (
        <div className='header navbar'>
            <div className='header-container'>
                <ul className='nav-left'>
                    <li>
                        <a
                            id='sidebar-toggle'
                            className='sidebar-toggle'
                            href='javascript:void(0);'
                        >
                            <i className='ti-menu'></i>
                        </a>
                    </li>
                    <li className='search-box'>
                        <a
                            className='search-toggle no-pdd-right'
                            href='javascript:void(0);'
                        >
                            <i className='search-icon ti-search pdd-right-10'></i>{' '}
                            <i className='search-icon-close ti-close pdd-right-10'></i>
                        </a>
                    </li>
                    <li className='search-input'>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Search...'
                        />
                    </li>
                </ul>
                <ul className='nav-right mr-4'>
                    <li className={`dropdown ${outIf(menu, 'show')}`}>
                        <a
                            href='/'
                            className='dropdown-toggle no-after peers fxw-nw ai-c lh-1'
                            onClick={(e) => {
                                e.preventDefault();
                                setMenu(!menu);
                            }}
                        >
                            <div className='peer mR-10'>
                                <img
                                    className='w-2r bdrs-50p'
                                    src='https://via.placeholder.com/200'
                                    alt=''
                                />
                            </div>
                            <div className='peer'>
                                <span className='fsz-sm c-grey-900'>
                                    Jecris
                                </span>
                            </div>
                        </a>
                        <ul
                            className={`dropdown-menu fsz-sm ${outIf(
                                menu,
                                'show',
                            )}`}
                        >
                            <li>
                                <Link
                                    to={url(routes.PROFILE)}
                                    className='d-b td-n pY-5 bgcH-grey-100 c-grey-700'
                                >
                                    <i className='ti-user mR-10'></i>{' '}
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <a
                                    href='/'
                                    className='d-b td-n pY-5 bgcH-grey-100 c-grey-700'
                                >
                                    <i className='ti-settings mR-10'></i>{' '}
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li role='separator' className='divider'></li>
                            <li>
                                <Link
                                    to={routes.HOME}
                                    className='d-b td-n pY-5 bgcH-grey-100 c-grey-700'
                                >
                                    <i className='ti-power-off mR-10'></i>{' '}
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
