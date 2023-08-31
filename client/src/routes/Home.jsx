import React from 'react'
import Header from '../components/Header'
import AddRestaurant from '../components/AddRestaurant'
import Filter from '../components/Filter'
import RestaurantList from '../components/RestaurantList'

const Home = () => {
  return (
    <div>
        <Header />
        <AddRestaurant />
        <Filter />
        <RestaurantList />
    </div>
  )
}

export default Home