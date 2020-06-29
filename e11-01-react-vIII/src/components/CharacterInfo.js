import React from 'react';

// Bootstrap Components
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CharacterInfo = ({ data, handleShow, idxCharacter }) => {
	return (
		<Col xs={4} className='my-3'>
			<Card>
				<Card.Body>
					<Card.Title>
						{data.name}
					</Card.Title>
					<Card.Text>
						<Button onClick={handleShow} data-idxcharacter={idxCharacter}>
							Ver más <i className="fas fa-arrow-right"></i>
						</Button>
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default CharacterInfo;