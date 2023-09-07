import React, { useState } from 'react'
import Header from '../components/Header'
import AddRestaurant from '../components/AddRestaurant'
import Sort from '../components/Sort'
import RestaurantList from '../components/RestaurantList'

const Home = () => {

const[sortColumn, setSortColumn] = useState('id');

  return (
    <div>
        <Header />
        <AddRestaurant />
        <Sort sortColumn={sortColumn} setSortColumn={setSortColumn} />
        <RestaurantList sortColumn={sortColumn} />
    </div>
  )
}

export default Home