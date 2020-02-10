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
                console.log(data)
                let nodes = data.graph.nodes
                let self = nodes[0].metadata
                this.setState({ nodes:nodes, self:self, isLoading:false })
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
                    <h1>{this.state.self.name} Network</h1>
                    <WeightView nodes={this.state.nodes} />
                </div>
            )
        }
    }
}
export default Network;