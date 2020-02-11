import React, {Component } from 'react';
import WeightView from './WeightView';

const API = 'http://localhost:9000/network/';

class Network extends Component{

    constructor(props){
        super(props)
        this.state = {
            nodes:null,
            self:null,
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
                this.setState({ shortName:shortName, root:data.root.metadata, given:data.given, received:data.received, isLoading:false })
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
                    {this.state.shortName}'s Network
                    <WeightView given={this.state.given} received={this.state.received}/>
                </div>
            )
        }
    }
}
export default Network;