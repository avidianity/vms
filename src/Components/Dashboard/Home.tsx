import React, { FC } from 'react';
import { Chart, registerables } from 'chart.js';
import { useEffect } from 'react';
Chart.register(...registerables);

type Props = {};

const Home: FC<Props> = (props) => {
	const setup = () => {
		const charts: Chart[] = [];

		charts.push(
			new Chart('appointments-by-month', {
				type: 'line',
				data: {
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					datasets: [
						{
							label: 'Appointments by Month',
							data: [12, 19, 3, 5, 10, 3, 52, 2, 35, 3, 92, 24],
							backgroundColor: 'rgba(51, 51, 255, 0.2)',
							borderColor: 'rgba(51, 51, 255, 1)',
							borderWidth: 1,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			})
		);

		charts.push(
			new Chart('total-vaccinated', {
				type: 'bar',
				data: {
					labels: ['Male', 'Female'],
					datasets: [
						{
							label: 'Total Patients Vaccinated (Percent)',
							data: [12, 19],
							backgroundColor: ['rgb(54, 162, 235)'],
						},
					],
				},
			})
		);

		charts.push(
			new Chart('vaccinated-vaccine', {
				type: 'bar',
				data: {
					labels: ['BCG', 'Hepa B', 'MMR', 'Sinovac'],
					datasets: [
						{
							label: 'Total Patients Vaccinated (Percent)',
							data: [12, 19, 40, 32],
							backgroundColor: ['rgb(54, 162, 235)'],
						},
					],
				},
			})
		);

		charts.push(
			new Chart('ages', {
				type: 'bar',
				data: {
					labels: ['Infant', 'Child', 'Teenage', 'Adult'],
					datasets: [
						{
							label: 'Total Patients Vaccinated (Percent)',
							data: [74, 19, 40, 32],
							backgroundColor: ['rgb(54, 162, 235)'],
						},
					],
				},
				options: {
					indexAxis: 'y',
				},
			})
		);

		return charts;
	};

	useEffect(() => {
		const charts = setup();
		return () => {
			charts.forEach((chart) => chart.destroy());
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 col-md-6'>
					<canvas id='appointments-by-month'></canvas>
				</div>
				<div className='col-12 col-md-6'>
					<canvas id='total-vaccinated'></canvas>
				</div>
				<div className='col-12 col-md-6'>
					<canvas id='vaccinated-vaccine'></canvas>
				</div>
				<div className='col-12 col-md-6'>
					<canvas id='ages'></canvas>
				</div>
			</div>
		</div>
	);
};

export default Home;
