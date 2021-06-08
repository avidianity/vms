import React, { FC } from 'react';
import bg from '../Assets/static/images/bg.jpg';
import logo from '../Assets/logo.svg';
import { useHistory } from 'react-router';
import { routes } from '../routes';

type Props = {};

const Login: FC<Props> = (props) => {
    const history = useHistory();

    return (
        <div className='peers ai-s fxw-nw h-100vh'>
            <div
                className='d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv'
                style={{ backgroundImage: `url(${bg})` }}
            >
                <div className='pos-a centerXY'>
                    <div
                        className='bgc-white bdrs-50p pos-r'
                        style={{ width: '120px', height: '120px' }}
                    >
                        <img
                            className='pos-a centerXY'
                            src={logo}
                            alt='VMS'
                            style={{ width: '100px', height: '100px' }}
                        />
                    </div>
                </div>
            </div>
            <div
                className='col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r'
                style={{ minWidth: '320px' }}
            >
                <h4 className='fw-300 c-grey-900 mB-40'>Login</h4>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        history.push(routes.DASHBOARD);
                    }}
                >
                    <div className='form-group'>
                        <label className='text-normal text-dark'>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            placeholder='Email'
                        />
                    </div>
                    <div className='form-group'>
                        <label className='text-normal text-dark'>
                            Password
                        </label>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Password'
                        />
                    </div>
                    <div className='form-group'>
                        <div className='peers ai-c jc-sb fxw-nw'>
                            <div className='peer'>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
