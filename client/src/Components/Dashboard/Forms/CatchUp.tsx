import dayjs from 'dayjs';
import React, { FC } from 'react';
import faker from 'faker';
import Header from './Header';

type Props = {};

const CatchUp: FC<Props> = (props) => {
    const data = [
        {
            vaccine: 'Measles',
            date: faker.date.past(),
            worker: `${faker.name.firstName()} ${faker.name.lastName()}`,
        },
        {
            vaccine: 'Sinovac',
            date: faker.date.past(),
            worker: `${faker.name.firstName()} ${faker.name.lastName()}`,
        },
        {
            vaccine: 'ECMA',
            date: faker.date.past(),
            worker: `${faker.name.firstName()} ${faker.name.lastName()}`,
        },
        {
            vaccine: 'HPB',
            date: faker.date.past(),
            worker: `${faker.name.firstName()} ${faker.name.lastName()}`,
        },
    ];

    return (
        <div className='container'>
            <div className='p-5 border border-dark'>
                <Header />
                <h5 className='text-center mb-3 mt-2 font-weight-bold'>
                    Measles-Rubella School-Based Immunization Catch-Up
                    Vaccination {dayjs().year()}
                </h5>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className='form-row'>
                        <div className='form-group col-12 col-md-6'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                className='form-control'
                            />
                        </div>
                        <div className='form-group col-12 col-md-6'>
                            <label htmlFor='grade_section'>Grade/Section</label>
                            <input
                                type='text'
                                name='grade_section'
                                id='grade_section'
                                className='form-control'
                            />
                        </div>
                        <div className='col-12 table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Vaccine</th>
                                        <th>Date</th>
                                        <th>Health Worker in Charge</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={item.vaccine}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={dayjs(
                                                        item.date,
                                                    ).format(
                                                        'MMMM DD, YYYY hh:mm A',
                                                    )}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={item.worker}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CatchUp;
