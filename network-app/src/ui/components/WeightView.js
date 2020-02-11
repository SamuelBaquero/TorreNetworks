import React, { Component } from 'react'

class WeightView extends Component{
    constructor(props){
        super(props)
        this.state = {
            onClick:false
        }
    }

    renderGiven(){
        
    }

    renderReceived(){
        
    }

    render(){
        return(
            <div>
                <p>Control Panel</p>
                <div>{this.renderGiven()}</div>
                <div>{this.renderReceived()}</div>
            </div>
        )
    }
}
export default WeightView;