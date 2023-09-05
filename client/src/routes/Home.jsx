import React from 'react'
import Header from '../components/Header'
import AddRestaurant from '../components/AddRestaurant'
import Sort from '../components/Sort'
import RestaurantList from '../components/RestaurantList'

const Home = () => {
  return (
    <div>
        <Header />
        <AddRestaurant />
        <Sort />
        <RestaurantList />
    </div>
  )
}

export default Home