import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import { RestaurntsContextProvider } from './context/RestaurantsContext';

const App = () => {
    return (
        <RestaurntsContextProvider>
            <div className = "container">
                <div>
                    <Router>
                        <Routes>
                            <Route exact path = "/" element={<Home/>}/>
                            <Route exact path = "/restaurants/:id/update" element={<UpdatePage/>}/>
                            <Route exact path = "/restaurants/:id" element={<RestaurantDetailPage/>}/>
                        </Routes>
                    </Router>
                </div>
            </div>
        </RestaurntsContextProvider>

    )
};

export default App;