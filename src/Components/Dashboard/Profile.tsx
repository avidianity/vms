import React, { createRef, FC, useState } from 'react';
import { v4 } from 'uuid';
import { UserContract } from '../../Contracts/user.contract';
import { storage } from '../../Libraries/firebase.library';
import { State } from '../../Libraries/state.library';
import { File as FileModel } from '../../Models/file.model';
import { User } from '../../Models/user.model';

type Props = {};

const state = State.getInstance();

const Profile: FC<Props> = (props) => {
	const fileRef = createRef<HTMLInputElement>();
	const formRef = createRef<HTMLFormElement>();
	const [user, setUser] = useState(state.get<UserContract>('user'));

	const saveFile = async (file: File) => {
		try {
			const fileName = `${file.name}-${v4()}`;
			const storageResponse = await storage.ref(fileName).put(file);

			const userModel = new User().forceFill(user!);

			await userModel.load(['picture']);

			if (userModel.has('picture')) {
				const picture = new FileModel().forceFill(userModel.get('picture')!);
				await picture.delete();
			}

			await userModel.picture().save(
				new FileModel({
					size: file.size,
					path: await storageResponse.ref.getDownloadURL(),
					type: file.type,
					name: fileName,
				})
			);

			await userModel.load(['picture']);

			toastr.success('Profile picture changed successfully.', 'Notice');

			const data = userModel.getData();

			state.set('user', data);
			setUser(data);
		} catch (error) {
			console.log(error);
			toastr.error('Unable to upload profile picture.', 'Oops!');
		} finally {
			formRef.current?.reset();
		}
	};

	return (
		<div className='container text-center'>
			<div className='card'>
				<div className='card-body'>
					<form ref={formRef}>
						<input
							ref={fileRef}
							accept='image/*'
							type='file'
							className='d-none'
							onChange={(e) => {
								if (e.target.files && e.target.files.length > 0) {
									const file = e.target.files[0];
									saveFile(file);
								}
							}}
						/>
					</form>
					<img
						src={user?.picture?.path || 'https://via.placeholder.com/200'}
						alt=''
						className='rounded-circle shadow border clickable'
						style={{
							height: '200px',
							width: '200px',
						}}
						onClick={(e) => {
							e.preventDefault();
							fileRef.current?.click();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Profile;
