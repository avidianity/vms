import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useURL } from '~/hooks';
import { routes } from '~/routes';
import logo from '../../Assets/logo.png';

type Props = {};

const Sidebar: FC<Props> = (props) => {
    const url = useURL();

    return (
        <div className='sidebar'>
            <div className='sidebar-inner'>
                <div className='sidebar-logo'>
                    <div className='peers ai-c fxw-nw'>
                        <div className='peer peer-greed'>
                            <a className='sidebar-link td-n' href='index.html'>
                                <div className='peers ai-c fxw-nw'>
                                    <div className='peer'>
                                        <div className='logo d-flex align-items-center justify-content-center'>
                                            <img
                                                src={logo}
                                                alt='VMS'
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='peer peer-greed'>
                                        <h5 className='lh-1 mB-0 logo-text'>
                                            VMS
                                        </h5>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className='peer'>
                            <div className='mobile-toggle sidebar-toggle'>
                                <a href='' className='td-n'>
                                    <i className='ti-arrow-circle-left'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className='sidebar-menu scrollable pos-r'>
                    <li className='nav-item mT-30 actived'>
                        <a className='sidebar-link' href='index.html'>
                            <span className='icon-holder'>
                                <i className='c-blue-500 ti-home'></i>{' '}
                            </span>
                            <span className='title'>Analytics</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='sidebar-link' href='email.html'>
                            <span className='icon-holder'>
                                <i className='c-brown-500 ti-email'></i>{' '}
                            </span>
                            <span className='title'>Messages</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='sidebar-link' href='compose.html'>
                            <span className='icon-holder'>
                                <i className='c-blue-500 ti-share'></i>{' '}
                            </span>
                            <span className='title'>Patients</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='sidebar-link' href='calendar.html'>
                            <span className='icon-holder'>
                                <i className='c-deep-orange-500 ti-calendar'></i>{' '}
                            </span>
                            <span className='title'>Vaccine Inventory</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='sidebar-link' href='chat.html'>
                            <span className='icon-holder'>
                                <i className='c-deep-purple-500 ti-comment-alt'></i>{' '}
                            </span>
                            <span className='title'>Vaccination Records</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <Link className='sidebar-link' to={url(routes.FORMS)}>
                            <span className='icon-holder'>
                                <i className='c-light-blue-500 ti-pencil'></i>{' '}
                            </span>
                            <span className='title'>Forms</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
