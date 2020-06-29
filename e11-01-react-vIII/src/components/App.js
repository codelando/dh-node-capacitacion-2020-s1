import React , { Component } from 'react';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Own Components
import CharacterInfo from './CharacterInfo';

class App extends Component  {
	constructor() {
		super();
		this.state = {
			characters: [],
			loading: true,
			showModal: false,
			nextPage: null,
			actualCharacter: null,
		}
	}

	fetchCall (endPoint, callback) {
		fetch(endPoint)
			.then(response => response.json())
			.then(data => callback(data))
			.catch(error => console.log(error))
	}

	componentDidMount() {
		this.fetchCall('https://swapi.dev/api/people/?format=json&page=1', data => {
			this.setState({
				characters: data.results,
				loading: false,
				nextPage: data.next
			})
		});
	}
  
	componentWillUnmount() {
		console.log('Se desmontó el componente');
	}
  
	componentDidUpdate() {
		console.log('Se actualizó');
	}

	handleShow = (e) => {
		const idx = e.currentTarget.dataset.idxcharacter
		const {characters} = this.state;
		const choosen = characters[idx];

		this.setState({ 
			showModal: true,
			actualCharacter: choosen
		 });
	};

	handleClose = () => {
		this.setState({ showModal: false });
	}

	loadMoreCharacters = () => {
		this.setState({ loading: true });

		const { nextPage, characters } = this.state;
		
		this.fetchCall(nextPage, data => {
			this.setState({
				characters: [...data.results, ...characters],
				nextPage: data.next,
				loading: false
			})
		});
	}

	render () {
		const { characters, loading, showModal, actualCharacter } = this.state;
		return (
		<Container className="my-5">
			<Row>
				<Col xs={12}>
					<h1>Star Wars Characters</h1>
				</Col>

				{/* Personajes */}
				<Col xs={12}>
					<Row>
						{ characters.map((oneCharacter, i) => {
								return <CharacterInfo key={i} idxCharacter={i} data={oneCharacter} handleShow={this.handleShow} />
							})
						}
					</Row>
				</Col>

				{/* Cargar más personajes */}
				<Col xs={6}>
					<Button onClick={this.loadMoreCharacters} >Cargar más personajes</Button>
				</Col>

				{/* Cargando */}
				{
					loading
						?
						<Col xs={6}>
							<Spinner animation="grow" />
						</Col>
						:
						null
				}
			</Row>

			{
				actualCharacter &&
				<Modal show={showModal} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>{actualCharacter.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Gender: {actualCharacter.gender}</p>
						<p>Age: {actualCharacter.birth_year}</p>
					</Modal.Body>
				</Modal>
			}

		</Container>
		);
	}
}

export default App;
