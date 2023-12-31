import React, {useContext, useEffect, useState} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = ({sortColumn}) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);

    let history = useNavigate();
    useEffect(() => {
        const fetchData  = async() => {
            // if (sortColumn.includes('dsc')){
            //     //sortColumn = sortColumn.substring(0, sortColumn.length - 4);
            //     console.log(sortColumn);
            //     try{
            //         const response = await RestaurantFinder.get(`/?sortBy=${sortColumn}&sortDirection=desc`);
            //         setRestaurants(response.data.data.restaurants);
            //     } catch(err){
            //         console.log(err);
            //     }
            // }
            // else{
                try{
                    const response = await RestaurantFinder.get(`/?sortBy=${sortColumn}`);
                    setRestaurants(response.data.data.restaurants);
                } catch(err){
                    console.log(err);
                }
           // }
        };

        fetchData();
    },[setRestaurants, sortColumn]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try{
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                //when specific restaurant matches id, remove it, if it doesn't match, add it back to array
                return restaurant.id !== id
            }));
        } catch (err){
            console.log(err);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history(`/restaurants/${id}/update`);
    }

    const handleRestaurantSelect = (id) => {
        history(`/restaurants/${id}`)
    }

    const renderRating = (restaurant) => {
        if (!restaurant.count){
            return <span className="text-warning">0 reviews</span>
        }
        return(
            <>
                <StarRating rating={restaurant.average_rating }/>
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        );
    }

  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className = "bg-primary">
                    <th scope = "col">Restaurant</th>
                    <th scope = "col">Location</th>
                    <th scope = "col">Cuisine</th>
                    <th scope = "col">Price Range</th>
                    <th scope = "col">Rating</th>
                    <th scope = "col">Edit</th>
                    <th scope = "col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map((restaurant) => {
                    return(
                        <tr onClick = {() => handleRestaurantSelect(restaurant.id)} key = {restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{restaurant.cuisine}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td><button 
                                onClick = {(e) => handleUpdate(e, restaurant.id)}
                                className="btn btn-warning">Update</button></td>
                            <td><button 
                                onClick = {(e) => handleDelete(e, restaurant.id)}
                                className="btn btn-danger">Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList