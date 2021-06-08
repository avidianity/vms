import React, { FC, useState } from 'react';

type Props = {};

const Infants: FC<Props> = (props) => {
    const [data, setData] = useState([
        {
            vaccine: 'BCG',
            treats: 'Tubeculosis',
            birth: true,
            one_one_half: false,
            two_one_half: false,
            three_one_half: false,
            nine_months: false,
            one_year: false,
        },
        {
            vaccine: 'Hepatitis B',
            treats: 'Hepatitis B',
            birth: true,
            one_one_half: false,
            two_one_half: false,
            three_one_half: false,
            nine_months: false,
            one_year: false,
        },
        {
            vaccine: 'Pentavalent Vaccine',
            treats: 'Meningitis, Hepa B, Pertussis, Pulmonary Disease',
            birth: false,
            one_one_half: true,
            two_one_half: true,
            three_one_half: true,
            nine_months: false,
            one_year: false,
        },
        {
            vaccine: 'MMR (Measles, Mumps, Rubella)',
            treats: 'German Measles, Tigdas, Beke',
            birth: false,
            one_one_half: false,
            two_one_half: false,
            three_one_half: false,
            nine_months: true,
            one_year: true,
        },
    ]);

    return (
        <div className='container p-5 border border-dark'>
            <h5 className='text-center mb-3 mt-2 font-weight-bold'>
                Schedule for Dosing Vaccines to Children 1 year old and Below
            </h5>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className='form-row'>
                    <div className='col-12 table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th
                                        rowSpan={2}
                                        className='vertical-align-center text-center'
                                    >
                                        Vaccine
                                    </th>
                                    <th
                                        rowSpan={2}
                                        className='vertical-align-center text-center'
                                    >
                                        Diseases Treated
                                    </th>
                                    <th colSpan={6} className='text-center'>
                                        Recommended Age
                                    </th>
                                </tr>
                                <tr>
                                    <th>At Birth</th>
                                    <th>
                                        1 <sup>1/2</sup> Months
                                    </th>
                                    <th>
                                        2 <sup>1/2</sup> Months
                                    </th>
                                    <th>
                                        3 <sup>1/2</sup> Months
                                    </th>
                                    <th>9 Months</th>
                                    <th>1 Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.vaccine}</td>
                                        <td>{item.treats}</td>
                                        <td>
                                            <input
                                                type='checkbox'
                                                checked={item.birth}
                                                onClick={() => {
                                                    item.birth = !item.birth;
                                                    data.splice(index, 1, item);
                                                    setData([...data]);
                                                }}
                                                className='form-control'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='checkbox'
                                                checked={item.one_one_half}
                                                onClick={() => {
                                                    item.one_one_half =
                                                        !item.one_one_half;
                                                    data.splice(index, 1, item);
                                                    setData([...data]);
                                                }}
                                                className='form-control'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='checkbox'
                                                checked={item.two_one_half}
                                                onClick={() => {
                                                    item.two_one_half =
                                                        !item.two_one_half;
                                                    data.splice(index, 1, item);
                                                    setData([...data]);
                                                }}
                                                className='form-control'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='checkbox'
                                                checked={item.three_one_half}
                                                onClick={() => {
                                                    item.three_one_half =
                                                        !item.three_one_half;
                                                    data.splice(index, 1, item);
                                                    setData([...data]);
                                                }}
                                                className='form-control'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='checkbox'
                                                checked={item.nine_months}
                                                onClick={() => {
                                                    item.nine_months =
                                                        !item.nine_months;
                                                    data.splice(index, 1, item);
                                                    setData([...data]);
                                                }}
                                                className='form-control'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='checkbox'
                                                checked={item.one_year}
                                                onClick={() => {
                                                    item.one_year =
                                                        !item.one_year;
                                                    data.splice(index, 1, item);
                                                    setData([...data]);
                                                }}
                                                className='form-control'
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
    );
};

export default Infants;
