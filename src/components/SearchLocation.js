import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import Spinner from "./Spinner";
import Results from "./Results";


const SearchLocation = () => {

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
        <Spinner />
        {state.searchedLocation &&
            <Results searchedLocation={state.searchedLocation}/>}
      </>
    );
}

export default SearchLocation;
