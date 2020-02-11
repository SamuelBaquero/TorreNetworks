import React, { Component } from 'react'
import '../css/WeightView.css'
import { Link } from 'react-router-dom'

class WeightView extends Component{
    constructor(props){
        super(props)
        this.state = {
            onClick:false
        }
    }

    findRedAlpha(weight){
        let alpha = (255*weight)/this.props.maxEdgeReceived
        let hexArray = alpha.toString(16).split('.')[0]
        let hexAlpha = (hexArray.split('').length === 2)?hexArray:'0'+hexArray
        return '#ff0000'+hexAlpha
    }

    findBlueAlpha(weight){
        let alpha = (255*weight)/this.props.maxEdgeGiven
        let hexArray = alpha.toString(16).split('.')[0]
        let hexAlpha = (hexArray.split('').length === 2)?hexArray:'0'+hexArray
        return '#0000ff'+hexAlpha
    }

    renderGiven(){
        return this.props.given.map((given, i)=>{
            //Get the alpha value then append it to RGB for RGBA and then pass it as style
            let rgba = this.findBlueAlpha(given.target.metadata.weight)
            let width = ((given.metadata.weight/this.props.maxGiven)*100)+'%' 
            return <div key={i} className='given'>
                    <div className="border-em">
                        <div>
                            {given.target.metadata.name}
                            {(given.metadata.recommendations > 1)?(' ('+given.metadata.recommendations+') '):''}
                        </div>
                        <div className='given-bar' style={{backgroundColor:rgba, width:width}}/>
                    </div>
                </div>
        })
    }

    renderReceived(){
        return this.props.received.map((received, i)=>{
            //Get the alpha value then append it to RGB for RGBA and then pass it as style
            let rgba = this.findRedAlpha(received.source.metadata.weight)
            let width = ((received.metadata.weight/this.props.maxReceived)*100)+'%' 
            return <div className='received' key={i}>
                    <div className="border-em">
                        <div>
                            {received.source.metadata.name}
                            {(received.metadata.recommendations > 1)?(' ('+received.metadata.recommendations+') '):''}
                        </div>
                        <div className='received-bar' style={{backgroundColor:rgba, width:width}}/>
                    </div>
                </div>
        })
    }

    render(){
        return(
            <div>
                <div className='container'>
                    <div className='column'>
                        <h2 className='received-title padding-left-right'>Received</h2>
                        {this.renderReceived()}
                    </div>
                    <div className='column'>
                        <h2 className='padding-left-right'>Given</h2>
                        {this.renderGiven()}
                    </div>
                </div>
            </div>
        )
    }
}
export default WeightView;