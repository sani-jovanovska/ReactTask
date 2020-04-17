import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import allRecepies from './recepies';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import ProductDetails from './ProductDetails';
import Ingrediant from "./Ingrediant";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function Receptii() {
  const [listStores, setlistStores] = useState([]);
  const [showDialog,setShowDialog]=useState(false);
  const [item,setItem]=useState({id:'',name:'',source:'',ingredients:[],time:'',instructions:''})
  const [errorTitle,setErrorTitle]=useState('');
  const [errorPrice,setErrorPrice]=useState('');



  useEffect(() => {
     
    fetchData();

  }, []);

  const fetchData = async () => {
    const store = createStore(allRecepies);
    setlistStores(store.getState().celaNizaOdRecepti);
    
  };
  const handleClickOpen = () => {
    console.log('test');
    setShowDialog(true);
  };
  const handleClose = () => {
    setShowDialog(false);
  };
  const addItem = item => {

    
       //let list = listStores.push(item.data);
       console.log(item);
       console.log(item.data);
       listStores.push(item); 
       console.log(listStores);

       handleClose();
      
      
  }


 
  function deleteProduct(id)
  {

    let list=listStores.filter(m => m.id !== id); 
    setlistStores(list);    

  }
//s
console.log(item,'item')
  return (
    
   
    <div class="main-page">
        <div class="card-header">
          <h2>Recipes</h2>
          <Button onClick={()=>handleClickOpen()}>ADD NEW RECIPE</Button>
        </div>
        <div class="card-holder">{listStores.map((x, i) =>
          
          <div class="card" key={i}>
            <div class="img-holder">
            <Link to={`/details/${x.id}`}>
            <img src={x.source} />
            </Link>
          
            </div>
            <div class="card-name">
              <h2>{x.name}</h2>
            </div>
            <div class="card-ingred">
              <h3>Ingrediants</h3>
              <div>
              <Ingrediant ingrediants={x.ingredients} />          
              </div>
            </div>
            <Button class="delete-button" onClick={()=>deleteProduct(x.id)}>Delete</Button>
            

          </div>
          
        )} 
        </div>


        <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Recipe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Recipe name"
            fullWidth
            helperText="Recipe name is required"    
            error={errorTitle.length<3 && item.name!==''}
            onChange={(e)=>{setItem({...item,name:e.target.value}); setErrorTitle(e.target.value)}}                     
          />
           <TextField
            autoFocus
            margin="dense"
            id="ingredients"
            label="Ingrediants"
            fullWidth            
            helperText="Add at least one ingrediant"   
            onChange={(e)=>{let list=[];list.push(e.target.value);setItem({...item,ingredients:list})}}       

          />
          
            <TextField
            autoFocus
            type='text'
            margin="dense"
            id="time"
            label="Preparation time"
            fullWidth
            onChange={(e)=>{setItem({...item,time:e.target.value})}}          

          />
          <TextField
            autoFocus
            margin="dense"
            id="instructions"
            label="Instructions"
            fullWidth
            onChange={(e)=>{setItem({...item,instructions:e.target.value})}}             
          />
           <TextField
            autoFocus
            margin="dense"
            id="source"
            label="Image Url"
            fullWidth
            onChange={(e)=>{setItem({...item,source:e.target.value})}}             
          />
          
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={item.source===''||(errorTitle.length<3 || item.name==='')} onClick={()=>{addItem(item)}} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>








    </div>

  );
}









function App() {
  return (
    <Router>
      <div class="main">
        <Switch>
          <Route path="/" exact component={Receptii} />
        <Route path="/details/:id" component={ProductDetails}/> 
        </Switch>
      </div>
    </Router>

  );
}

export default App;
