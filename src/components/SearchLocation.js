import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import LoadingIndicator from './LoadingIndicator';
import Results from './Results';

function SearchLocation() {

    const [state, setState] = useState({
        location: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(state);
        setState({ ...state, "searchedLocation": state.location });
    };

    return (

      <>
        <div className="search-section">
          <Form className="search-form" onSubmit={handleSearch}>
            <Row>
              <Col>
                <Form.Group controlId="description">
                  <Form.Control
                    type="text"
                    name="location"
                    value={state.location || ''}
                    placeholder="Enter location"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                 <Button variant="primary" type="submit" className="btn-search">
                    Search
                 </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <LoadingIndicator />
        <Results searchedLocation={state.searchedLocation}/>
      </>
    );
}

export default SearchLocation;
