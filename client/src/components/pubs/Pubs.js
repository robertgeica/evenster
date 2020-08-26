import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import PropTypes from 'prop-types';

import FileUpload from '../fileUpload/FileUpload';

import Modal from 'react-modal';
import './pubs.scss';

import axios from 'axios';

import {
	loadPubs,
	loadPub,
	handleAddPub,
	handleDeletePub,
	handleUpdatePub,
	handleAddPersonnel,
	handleAddService,
	handleDeletePersonnel,
	handleDeleteService,
	handleEditPersonnel,
	handleEditService
} from '../../actions/pub';

const Pubs = ({ pubs, currentPubs }) => {
	const [ pub, setPub ] = useState({});
	const [ personnel, setPersonnel ] = useState({});
	const [ service, setService ] = useState({});

	const [ toggleModal, setToggleModal ] = useState(undefined);
	const [ toggleEdit, setToggleEdit ] = useState(undefined);
	const [ togglePersonnel, setTogglePersonnel ] = useState(undefined);
	const [ toggleService, setToggleService ] = useState(undefined);

	const [ togglePersonnelEdit, setTogglePersonnelEdit ] = useState(undefined);
	const [ toggleServiceEdit, setToggleServiceEdit ] = useState(undefined);

	const [ pubId, setPubId ] = useState(undefined);
	const [ workerId, setWorkerId ] = useState(undefined);
	const [ serviceId, setServiceId ] = useState(undefined);

	const onChange = (e) => {
		const pubImage = e.target.parentNode.childNodes[0].value;
		const pubName = e.target.parentNode.childNodes[1].value;
		const pubAdress = e.target.parentNode.childNodes[2].value;
		const rentPrice = e.target.parentNode.childNodes[3].value;
		const pubCapacity = e.target.parentNode.childNodes[4].value;
		// const additionalPersonnel = [];
		// const additionalServices = [];

		const newPub = {
			pubImage,
			pubName,
			pubAdress,
			rentPrice,
			pubCapacity
		};

		setPub(newPub);
	};

	const onChangePersonnel = (e) => {
		const workerType = e.target.parentNode.childNodes[0].value;
		const price = e.target.parentNode.childNodes[1].value;

		const newPersonnel = {
			workerType,
			price
		};

		setPersonnel(newPersonnel);
	};

	const onChangeService = (e) => {
		const serviceType = e.target.parentNode.childNodes[0].value;
		const price = e.target.parentNode.childNodes[1].value;

		const newService = {
			serviceType,
			price
		};

		setService(newService);
	};

	const handleOpenModal = () => {
		setToggleModal(true);
	};
	const handleCloseModal = () => {
		setToggleModal(false);
	};
	const handleOpenEdit = () => {
		setToggleEdit(true);
	};
	const handleCloseEdit = () => {
		setToggleEdit(false);
	};
	const handleOpenPersonnel = () => {
		setTogglePersonnel(true);
	};
	const handleClosePersonnel = () => {
		setTogglePersonnel(false);
	};

	const handleOpenPersonnelEdit = () => {
		setTogglePersonnelEdit(true);
	};
	const handleClosePersonnelEdit = () => {
		setTogglePersonnelEdit(false);
	};

	const handleOpenService = () => {
		setToggleService(true);
	};
	const handleCloseService = () => {
		setToggleService(false);
	};

	const handleOpenServiceEdit = () => {
		setToggleServiceEdit(true);
	};
	const handleCloseServiceEdit = () => {
		setToggleServiceEdit(false);
	};

	const [ loading, setLoading ] = useState(undefined);
	const getImages = async () => {
		const res = await axios.get('/upload');
		setLoading(false);
	};

	useEffect(() => {
		store.dispatch(loadPubs());
		getImages();
	}, []);

	return (
		<div className="pubs-container">
			<FileUpload />

			{/* add new pub*/}
			<Modal
				isOpen={!!toggleModal}
				onRequestClose={handleCloseModal}
				ariaHideApp={false}
				closeTimeoutMS={200}
				className="modal"
				style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
			>
				<form onChange={onChange}>
					<input type="text" name="pubImage" placeholder="pubImage" />
					<input type="text" name="pubName" placeholder="pubName" />
					<input type="text" name="pubAdress" placeholder="pubAdress" />
					<input type="text" name="rentPrice" placeholder="rentPrice" />
					<input type="text" name="pubCapacity" placeholder="pubCapacity" />
				</form>

				<button
					className="button"
					onClick={() => {
						store.dispatch(handleAddPub(pub));
						handleCloseModal();
					}}
				>
					Add
				</button>
			</Modal>

			{/* edit a pub*/}
			<Modal
				isOpen={!!toggleEdit}
				onRequestClose={handleCloseEdit}
				ariaHideApp={false}
				closeTimeoutMS={200}
				className="modal"
				style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
			>
				<form onChange={onChange}>
					<input type="text" defaultValue={pub.pubImage} name="pubImage" placeholder="pubImage" />
					<input type="text" defaultValue={pub.pubName} name="pubName" placeholder="pubName" />
					<input type="text" defaultValue={pub.pubAdress} name="pubAdress" placeholder="pubAdress" />
					<input type="text" defaultValue={pub.rentPrice} name="rentPrice" placeholder="rentPrice" />
					<input type="text" defaultValue={pub.pubCapacity} name="pubCapacity" placeholder="pubCapacity" />
				</form>

				<button
					className="button"
					onClick={() => {
						store.dispatch(handleUpdatePub(pubId, pub));
						handleCloseEdit();
					}}
				>
					Edit
				</button>
			</Modal>

			{/* add personnel */}
			<Modal
				isOpen={!!togglePersonnel}
				onRequestClose={handleClosePersonnel}
				ariaHideApp={false}
				closeTimeoutMS={200}
				className="modal"
				style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
			>
				<form onChange={onChangePersonnel}>
					<input type="text" name="workerType" placeholder="workerType" />
					<input type="text" name="price" placeholder="price" />
				</form>

				<button
					className="button"
					onClick={() => {
						store.dispatch(handleAddPersonnel(pubId, personnel));
						handleClosePersonnel();
					}}
				>
					add personnel
				</button>
			</Modal>

			{/* edit personnel/workers */}
			<Modal
				isOpen={!!togglePersonnelEdit}
				onRequestClose={handleClosePersonnelEdit}
				ariaHideApp={false}
				closeTimeoutMS={200}
				className="modal"
				style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
			>
				<form onChange={onChangePersonnel}>
					<input type="text" name="workerType" defaultValue={personnel.workerType} placeholder="workerType" />
					<input type="text" name="price" defaultValue={personnel.price} placeholder="price" />
				</form>

				<button
					className="button"
					onClick={() => {
						store.dispatch(handleEditPersonnel(pubId, workerId, personnel));
						handleClosePersonnelEdit();
					}}
				>
					edit personnel
				</button>
			</Modal>

			{/* add service */}
			<Modal
				isOpen={!!toggleService}
				onRequestClose={handleCloseService}
				ariaHideApp={false}
				closeTimeoutMS={200}
				className="modal"
				style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
			>
				<form onChange={onChangeService}>
					<input type="text" name="serviceType" placeholder="serviceType" />
					<input type="text" name="price" placeholder="price" />
				</form>

				<button
					className="button"
					onClick={() => {
						store.dispatch(handleAddService(pubId, service));
						handleCloseService();
					}}
				>
					add service
				</button>
			</Modal>

			{/* edit service */}
			<Modal
				isOpen={!!toggleServiceEdit}
				onRequestClose={handleCloseServiceEdit}
				ariaHideApp={false}
				closeTimeoutMS={200}
				className="modal"
				style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
			>
				<form onChange={onChangeService}>
					<input type="text" name="serviceType" placeholder="serviceType" />
					<input type="text" name="price" placeholder="price" />
				</form>

				<button
					className="button"
					onClick={() => {
						store.dispatch(handleEditService(pubId, serviceId, service));
						handleCloseServiceEdit();
					}}
				>
					edit service
				</button>
			</Modal>

			<button className="button" onClick={handleOpenModal}>
				Add pub
			</button>

			{pubs.map((pub) => (
				<div key={pub._id} className="pub">
					{loading == false && `/${pub.pubImage}` && <img src={`/${pub.pubImage}`} alt={`${pub.pubImage}`} />}

					<p>pubName: {pub.pubName}</p>
					<p>pubAdress: {pub.pubAdress}</p>
					<p>rentPrice: {pub.rentPrice}</p>
					<p>pubCapacity: {pub.pubCapacity}</p>
					<p>id: {pub._id} </p>

					<h3>Additional personnel: </h3>
					{pub.additionalPersonnel != undefined ? (
						pub.additionalPersonnel.map((worker) => (
							<Fragment key={worker._id}>
								<p>Worker: {worker.workerType}</p>
								<p>Price: {worker.price}</p>
								<div className="action-buttons">
									<button
										className="button"
										onClick={() => {
											store.dispatch(handleDeletePersonnel(pub._id, worker._id));
										}}
									>
										Delete
									</button>
									<button
										className="button"
										onClick={() => {
											handleOpenPersonnelEdit();
											setPubId(pub._id);
											setWorkerId(worker._id);
										}}
									>
										Edit
									</button>
								</div>
							</Fragment>
						))
					) : (
						console.log('undef')
					)}

					<h3>Additional services: </h3>
					{pub.additionalServices != undefined ? (
						pub.additionalServices.map((service) => (
							<Fragment key={service._id}>
								<p>Service: {service.serviceType}</p>
								<p>Price: {service.price}</p>
								<div className="action-buttons">
									<button
										className="button"
										onClick={() => {
											store.dispatch(handleDeleteService(pub._id, service._id));
										}}
									>
										Delete
									</button>
									<button
										className="button"
										onClick={() => {
											handleOpenServiceEdit();
											setPubId(pub._id);
											setServiceId(service._id);
										}}
									>
										Edit
									</button>
								</div>
							</Fragment>
						))
					) : (
						console.log('undef')
					)}

					<div className="action-buttons">
						<button className="button" onClick={() => store.dispatch(handleDeletePub(pub._id))}>
							Delete
						</button>

						<button
							className="button"
							onClick={() => {
								handleOpenEdit();
								setPubId(pub._id);
								setPub(pub);
							}}
						>
							Edit
						</button>

						<button
							className="button"
							onClick={() => {
								handleOpenPersonnel();
								setPubId(pub._id);
							}}
						>
							Add personnel
						</button>

						<button
							className="button"
							onClick={() => {
								handleOpenService();
								setPubId(pub._id);
							}}
						>
							Add service
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	pubs: state.pub.pubs,
	currentPub: state.pub.currentPub
});

export default connect(mapStateToProps)(Pubs);
