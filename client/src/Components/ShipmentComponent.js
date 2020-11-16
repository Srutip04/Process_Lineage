import React, { Component } from 'react';
//import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,
    Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText , Modal, ModalHeader, ModalBody} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import StepProgressBar from 'react-step-progress';
import Web3 from "web3";
import 'react-step-progress/dist/index.css';

const step1Content = <h1 style={{width: 1000, height: 200 , marginLeft: "300px"}}>Step 1 </h1>;
const step2Content = <h1 style={{width: 1000, height: 200, marginLeft: "300px"}}>Step 2 </h1>;
const step3Content = <h1 style={{width: 1000, height: 200, marginLeft: "300px"}}>Step 3 </h1>;
const step4Content = <h1 style={{width: 1000, height: 200, marginLeft: "300px"}}>Step 4 </h1>;

var util;
var util1;

function step2Validator() {
  // return a boolean
}
 
function step3Validator() {
  // return a boolean
}

function step4Validator() {
    // return a boolean
}
 
function onFormSubmit() {
  
}
let conver = async (x) => {

    util =  (Web3.utils.toWei(x, 'milli'));
}
let converb = async (x) => {
    util1 = (Web3.utils.fromWei(x, 'milli'));
}
let value;
let value1;
function shipstate(s) {

    switch(s) {
        case 0:
            value = 'added';
            break;
        case 1:
            value = 'pending';
            break;
        case 2:
            value = 'confirmed';
            break;
        case 3:
            value = 'manufactured';
            break;
        case 4:
            value = 'packaged';
            break;
        case 5:
            value = 'outfordel';
            break;
        case 6:
            value = 'delievered';
            break;
        case 7:
            value = 'cancel';
            break;
    }
    return value;
}
function status(s) {
    
    switch(s) {
        case 0:
            value1 = 'notpaid';
            break;
        case 1:
            value1 = 'inSc';
            break;
        case 2:
            value1 = 'received';
            break;
    }  
    return value1; 
}
var alldocs = [];
function Allpatrender({dish}){
    // var day = moment.unix(dish.dateofComp); 
    // var xy = dish.dateofComp;
    // var date = new Date(xy*1000);
    // var time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
    // var yz = xy != 0?"bg-success text-white":""; 
    converb(dish.totalamt.toString());
    var val = shipstate(parseInt(dish.shipstate));
    var val1 = status(parseInt(dish.payment));
   
    return(
        <Card >
        <i className="fa fa-envelope fa-5x"></i>
        <CardBody>
        <CardTitle>Shipment ID : {dish.itemcat}</CardTitle>
        <CardText><small>Item Cat : {dish.itemcat}</small></CardText>
        <CardText><small>Item qty : {dish.qty}</small></CardText>
        <CardText><small>Shipment Status : {val}</small></CardText>
        <CardText><small>Totalamt : {util1}</small></CardText>
        <CardText><small>Payment Status :{val1}</small></CardText>
        
        <Col md={{size:10, offset:1}}>
            {/* <Button color="primary" onClick={this.toggleModal}>
                Shipment
            </Button> */}
        </Col>
        </CardBody>
      </Card>
    )
}

class Shipment extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] , isModalOpen: false};
        this.toggleModal = this.toggleModal.bind(this);
    }  
        //this.com = this.com.bind(this);
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    async componentDidMount(){
        var res = await this.props.contract?.methods.shipmentcount().call();
           console.log(res);    
                var response= [];
                for(var i=1;i<=res;i++){
                    var rex = await this.props.contract?.methods.Shipments(i).call();
                    response.push(rex);
                }
                alldocs = [];
                alldocs = response;
                console.log(response);
                this.setState({ dish : alldocs});
         
    }

    
     render(){
  
        const Menu = this.state.dish.map((x) => {
            return (
                <div key={x} className="col-4 col-md-3">
                    < Allpatrender dish={x}/>
                </div>
            );
        })
    
        return(
        <div className="container">
            <h2>All Shipments</h2>
            <br/>
            <br/>
            <div className="row">
                {Menu}
            </div>
            <Button color="primary" onClick={this.toggleModal}>
                Shipment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="modal-lg">
                <ModalHeader toggle={this.toggleModal}>Shipment Status</ModalHeader>
                <ModalBody>
                    <StepProgressBar startingStep={0} onSubmit={onFormSubmit} steps={[
                        {
                        label: 'Step 1',
                        name: 'step 1',
                        content: step1Content
                        },
                        {
                        label: 'Step 2',
                        name: 'step 2',
                        content: step2Content,
                        validator: step2Validator
                        },
                        {
                        label: 'Step 3',
                        name: 'step 3',
                        content: step3Content,
                        validator: step3Validator
                        },
                        {
                            label: 'Step 4',
                            name: 'step 4',
                            content: step4Content,
                            validator: step4Validator
                            }
                    ]}
                    />
                </ModalBody>
            </Modal>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
        
            
        )
    }

}



export default Shipment;