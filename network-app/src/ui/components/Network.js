import React, {Component } from 'react';
import WeightView from './WeightView';

import '../css/network.css';

const API = 'http://localhost:9000/network/';

class Network extends Component{

    constructor(props){
        super(props)
        this.state = {
            nodes:null,
            isLoading:true,
            error:null
        }
    }

    componentDidMount(){
        fetch(API+this.props.match.params.username)
            .then((response) => {
                if(response.ok){
                    return response.json()
                }else{
                    throw new Error ('Something went wrong...')
                }
            })
            .then((data)=>{
                let shortName = data.root.metadata.name.split(' ')[0];
                this.setState({ 
                    shortName:shortName, 
                    root:data.root.metadata, 
                    given:data.given, 
                    received:data.received, 
                    isLoading:false,
                    maxEdgeGivenW:data.maxEdgeGivenW,
                    maxEdgeReceiW:data.maxEdgeReceiW,
                    maxGiven:data.maxGiven,
                    maxReceived:data.maxReceived
                })
            })
            .catch((error)=>{
                this.setState({ error:error, isLoading:false})
            })
    }

    render(){
        if(this.state.isLoading){
            return (
                <div>Loading Network</div>
            )
        }else{
            return(
                <div>
                    <h1 align='center'>{this.state.shortName}'s Network</h1>
                    <p className='paragraph'>Torre's Network shows everyone who you have recommended and who has recommended you, if it has a number after the name it means you have been recommended or recommended someone more than once. The color of the bar show the weight of the person and the lenght of the bar show the weight of the recomendation. Also you can click the name of someone to view their network.</p>
                    <WeightView 
                        given={this.state.given} 
                        received={this.state.received} 
                        maxEdgeGiven={this.state.maxEdgeGivenW} 
                        maxEdgeReceived={this.state.maxEdgeReceiW}
                        maxGiven={this.state.maxGiven}
                        maxReceived={this.state.maxReceived}/>
                </div>
            )
        }
    }
}
export default Network;