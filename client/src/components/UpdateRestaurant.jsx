import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = () => {
    const {id} = useParams();
    let history = useNavigate();
    const {restaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
      const fetchData = async() => {
        const response = await RestaurantFinder.get(`/${id}`)
        console.log(response.data.data)
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setCuisine(response.data.data.restaurant.cuisine);
        setPriceRange(response.data.data.restaurant.price_range);
      };
      fetchData();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault()
      const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
        name, 
        location,
        cuisine, 
        price_range: priceRange
      });
      history("/");
    }

  return (
    <div>
      <form action = "">
        <div className='form-group'>
          <label htmlFor="name">
              Name
          </label>
          <input 
            value = {name}
            onChange={e => setName(e.target.value)}
            type = 'text' 
            id = "name" 
            className = 'form-control'/>
        </div>

        <div className='form-group'>
          <label htmlFor="location">
              Location
          </label>
          <input 
            value = {location}
            onChange={e => setLocation(e.target.value)}
            type = 'text' 
            id = "location" 
            className = 'form-control'/>
        </div>

        <div className='form-group'>
          <label htmlFor="cuisine">
              Cuisine
          </label>
          <input 
            value = {cuisine}
            onChange={e => setCuisine(e.target.value)}
            type = 'text' 
            id = "cuisine" 
            className = 'form-control'/>
        </div>

        <div className='form-group'>
          <label htmlFor="price_range">
              Price Range
          </label>
          <input 
            value = {priceRange}
            onChange={e => setPriceRange(e.target.value)}
            type = 'number' 
            id = "price_range" 
            className = 'form-control'/>
        </div>
        <button 
          onClick = { handleSubmit }
          type = "submit"
          className = "btn btn-primary">Submit          
        </button>
      </form>
    </div>
  )
};

export default UpdateRestaurant;