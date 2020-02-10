import React, { Component } from 'react'

class WeightView extends Component{
    constructor(props){
        super(props)
        this.state = {
            onClick:false
        }
    }

    render(){
        return(
            <div>
                <p>Control Panel</p>
                <div></div>
            </div>
        )
    }
}
export default WeightView;