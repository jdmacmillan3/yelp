import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import RestaurantFinder from '../apis/RestaurantFinder';
import RestaurantList from './RestaurantList';

function Sort() {
  const {sortBy, setSortBy} = useState(''); 

  const handleSortByName = async (e) => {
    e.preventDefault();
    try{
      const sortByNameList = await RestaurantFinder.get("?sortBy=name");
      console.log(sortByNameList);
    } catch(err){
      console.log(err);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary mb-3" id="dropdown-basic">
        Sort By
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick = {(e) => handleSortByName(e)}> Name </Dropdown.Item>
        {/* <Dropdown.Item onClick={() => handleSortSelection('PriceHighToLow')}>Price (High to Low)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortSelection('PriceLowToHigh')}>Price (Low to High)</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortSelection('Location')}>Location</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Sort;
