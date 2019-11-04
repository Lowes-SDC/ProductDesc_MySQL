import React from "react";
import ReactDOM from "react-dom";
import "./style/header.css";
import "./style/style.css";
import "./style/footer.css";
import axios from 'axios';
import PropTypes from 'prop-types';
import Banner from "./components/layouts/Banner.jsx";
import Shipbanner from "./components/layouts/Shipbanner.jsx";
import Footer from "./components/layouts/Footer.jsx";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { mdiHeartOutline } from '@mdi/js';
import { mdiHeart } from '@mdi/js';
import { mdiExportVariant } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiCubeSend } from '@mdi/js';
import { mdiTruckFast } from '@mdi/js';
import { mdiCheckboxMarkedCircle } from '@mdi/js';
import { mdiAlphaXCircle } from '@mdi/js';


//window.changeWindow = new Event("changeWindow");
export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        iconColor: '#0471AF',
        iconHeart: mdiHeartOutline,
        iconTxt: 'SAVE',
        productID: 9200000,
        stock: [{
            ID: '',
            Prices: '',
            Descriptions: ''
        }],
        default: '',
        itemDescs: [],
        pointer: 100,
      };
      this.getTask = this.getTask.bind(this);
      this.showDiscount = this.getTask.bind(this);
      this.changeHeart = this.changeHeart.bind(this);
      this.handleDecrement = this.handleDecrement.bind(this);
      this.handleIncrement = this.handleIncrement.bind(this);
      this.handleSubmitToBadge = this.handleSubmitToBadge.bind(this);
    }

    getTask() {
      axios.get('/desc', {
        params: {
          id: this.state.productID
        }
      })
      .then((results) => {
        console.log("These are the results: ", results);                
        this.setState({ 
          itemDescs: results.data[this.state.pointer].Descriptions.split(', '),
          price: results.data[this.state.pointer].Prices.toFixed(2),
          fakePrice: results.data[this.state.pointer].Mockprice.toFixed(2),
          discount: results.data[this.state.pointer].Discount
        });
      });   
    }   

    changeHeart() {
      if (this.state.iconHeart === mdiHeartOutline) {
        this.setState({
            iconHeart: mdiHeart,
            iconColor: '#DD0637',
            iconTxt: 'SAVED'
        });
      } else {
        this.setState({
          iconHeart: mdiHeartOutline,
          iconColor: '#0471AF',
          iconTxt: 'SAVE'
      });
      }
    }

    handleDecrement() {
      if (document.getElementsByClassName("quantity").quantity.value > 1) {
        document.getElementsByClassName("quantity").quantity.value--;
      }
    }

    handleIncrement() {
      if (document.getElementsByClassName("quantity").quantity.value) {
        document.getElementsByClassName("quantity").quantity.value++;
      }
    }

    handleSubmitToBadge() {
      let numItems = document.getElementsByClassName("quantity").quantity.value;
      const event = new CustomEvent('addToCart', { detail: numItems });
      window.dispatchEvent(event);
    }

    componentWillMount(){
      this.getTask();
    }  

    componentDidMount() {
      window.addEventListener('changeItem', (event) => {
        if (event.detail) {
          this.setState({
            itemDescs: this.state.stock[event.detail].Descriptions.split(', '),
            price: this.state.stock[event.detail].Prices.toFixed(2),
            fakePrice: this.state.stock[event.detail].Mockprice.toFixed(2),
            discount: this.state.stock[event.detail].Discount
          });
        }
      });
    }

    render() {
      return (
        <React.Fragment>
            <Paper className="description">
              <Grid container wrap="nowrap">
                <Grid item xs zeroMinWidth>
                  {
                    this.state.discount < 1 ?
                    (<p className="price"><sup className="first-letter">$</sup>{this.state.price}</p>)
                    :
                    (
                      <React.Fragment>
                        <p className="price"><sup className="first-letter">$</sup>{this.state.price}
                        <span className="prevPrice">Was {this.state.fakePrice}</span></p>
                        <p className="save">SAVE {this.state.discount}%</p>
                        </React.Fragment>
                    )
                  }
                </Grid>
              </Grid>
            </Paper>
            <Paper className="">
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs zeroMinWidth>
                  <ul className="bullets">
                    {this.state.itemDescs.map(value => (
                    <li key={value} className="bulletpoint">{value}</li>))}
                  </ul>

                  <hr></hr>

                  <div className="number-input cartForm">
                    <button className="butt" onClick={this.handleDecrement} ></button>
                    <input className="quantity" min="1" name="quantity" defaultValue="1" type="number"></input>
                    <button onClick={this.handleIncrement} className="plus"></button>
                  </div>

                  <button className="addToCart butt" onClick={this.handleSubmitToBadge}>
                    <span id="addTxt">ADD TO CART</span>
                  </button>

                  <div className="btngrp">
                  <button className="saveButton butt" onClick={this.changeHeart}>
                      <Icon path={this.state.iconHeart}
                        title="Save"
                        size="14px"
                        color={this.state.iconColor}
                      />
                      <span id="saveTxt">{this.state.iconTxt}</span>
                  </button>
                  <button className="saveButton butt">
                      <Icon path={mdiExportVariant}
                        title="Share"
                        size="14px"
                        color="#0471AF"
                      />
                      <span id="saveTxt">SHARE</span>
                  </button>
                  </div>

                  <hr></hr>
                </Grid>
              </Grid>
            </Paper>
            <Paper className="">
              <Grid container wrap="nowrap" spacing={0}>
                <Grid item xs>
                  <div className="shipAvailContainer">
                    <div className="availIcons">
                    <div>
                      <Icon path={mdiCubeSend}
                            title="Favorite"
                            size="33px"
                      />
                      <h4>Ships to Store FREE</h4>
                    </div>
                    <div>
                      <Icon path={mdiCheckboxMarkedCircle} className="availPointer"
                        title="Favorite"
                        size="14px"
                        color="#338700"
                      />
                      <span className="ready4pickup">Ready for pickup: Estimated by 10/30/2019</span>
                    </div>
                    </div>
                    <div className="availIcons">
                    <div>
                      <Icon path={mdiTruckFast}
                            title="Share"
                            size="33px"
                      />
                      <h4>FREE Shipping</h4>
                    </div>
                    <div>
                      <Icon path={mdiCheckboxMarkedCircle} className="availPointer"
                        title="Available"
                        size="14px"
                        color="#338700"
                      />
                      <span className="ready4pickup" id="ready4delivery">Ready for delivery: Estimated by 10/30/2019</span>
                    </div>
                    </div>
                  </div>
                  
                </Grid>
              </Grid>
            </Paper>
        </React.Fragment>
      )
    }
  }

  ReactDOM.render(<App />, document.getElementById("description"));


  // <Typography></Typography>