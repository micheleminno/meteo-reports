import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from "./Spinner";
import Results from "./Results";
import { initiateGetLocations } from '../actions/locations';
import LocationContext from '../context/LocationContext';


const SearchLocation = (props) => {

    const currentValue = useContext(LocationContext);

    const [results, setResults] = useState([]);
    const [location, setLocation] = useState(null);
    const [searchedLocation, setSearchedLocation] = useState(null);

    useEffect(() => {
      setResults(props.locations);
    }, [props.locations]);

    const loadLocations = (searchedLocation) => {
        const {dispatch} = props;
        dispatch(
          initiateGetLocations(searchedLocation)
        )
          .then((response) => {
              console.log(response);
          })
          .catch();
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setLocation(value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        loadLocations(location);
        setSearchedLocation(location);
    };

    const value = {...currentValue, locations: results};

    return (

      <LocationContext.Provider value={value}>
        <div className="search-section">
          <Form className="search-form" onSubmit={handleSearch}>
            <Row>
              <Col sm={8}>
                <Form.Group controlId="description">
                  <Form.Control
                    type="text"
                    name="location"
                    value={location || ''}
                    placeholder="Enter location"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                 <Button variant="primary" type="submit" className="btn-search">
                    Search
                 </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Spinner />
        {searchedLocation &&
            <Results />}
      </LocationContext.Provider>
    );
}

SearchLocation.propTypes = {
  locations: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    locations: state.locations
});

export default connect(mapStateToProps)(SearchLocation);
