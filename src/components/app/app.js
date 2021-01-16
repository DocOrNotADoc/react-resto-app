import React from 'react';
import {MainPage, CartPage, ItemPage} from '../pages';
import AppHeader from '../app-header';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Background from './food-bg.jpg';


const App = () => {

    
    return (
        <Router>
            <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
                <AppHeader total={50}/>
                <Route path='/' exact component={MainPage}/>
                <Route path='/total' component={CartPage}/>
                <Route exact path='/item/:id' component={ItemPage}/>
            </div>
        </Router>
    )
}

export default App;