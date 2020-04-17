import React, { useEffect,useState } from 'react';

import { createStore } from 'redux';
import allRecepies from './recepies';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Ingrediant from "./Ingrediant";


function ProductDetails({match}) {


      const [listStores, setlistStores] = useState([]);
 

      useEffect(() => {
         
        fetchData();
    
      }, []);
    
      const fetchData = async () => {
        const store = createStore(allRecepies);
        setlistStores(store.getState().celaNizaOdRecepti[match.params.id]);
        
      };
      console.log(listStores);

      
  return (

    <div class="product">
      <div class="back-btn"><Link to='/'>BACK TO RECIPES</Link></div>
      <div class="product-details">
        <div class="img-holder"><img src={listStores.source} /></div>
        <div class="description">
          <h2>{listStores.name}</h2>
          <p class="prep-time">
            <strong>Preparation time: </strong>
            <span>{listStores.time} min</span>
          </p>
          <p class="instructions">
            <strong>Detail Instructions</strong>
            <span>{listStores.instructions}</span>
          </p>
        </div>
      </div>
    </div>
    
  );
}

export default ProductDetails;
