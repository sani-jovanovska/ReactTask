import {combineReducers} from 'redux';
import recepie from './recepies';



const allRecepies = combineReducers ({
    celaNizaOdRecepti: recepie
});

export default allRecepies;