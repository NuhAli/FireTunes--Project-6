import React, { Component } from 'react';
import {IoMdAddCircleOutline,IoMdRemoveCircleOutline} from 'react-icons/io'
import './Track.scss'

// Track component (class)
class Track extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: false
        }
        this.addNewTrack = this.addNewTrack.bind(this)
        this.removeNewTrack = this.removeNewTrack.bind(this)
        this.renderIcon = this.renderIcon.bind(this)
    }
    // Toggles the selected state true.
    addNewTrack(){
        this.setState(
            {
                selected: true
            }
        )
        this.props.addTrack(this.props.track)
    }
    // Function is used to pass parameter into the remove track function.
    removeNewTrack(){
        this.props.removeTrack(this.props.track)
    }

    // Function used to render the appropriate icon
    renderIcon(){
        if(this.props.isRemoval && !this.props.existingPlaylist){
            return(
                <td className="status">
                        <IoMdRemoveCircleOutline
                            className="icon"
                            onClick={this.removeNewTrack}
                        />
                    </td>
            )
        } else if(!this.props.isRemoval && !this.props.existingPlaylist) {
            return(
                <td className="status">
                        <IoMdAddCircleOutline
                            className="icon"
                            onClick={this.addNewTrack}
                        />
                </td>
            )
        }
        else {
            return (
                <td className="status" style={{display:"none"}}>
                        <IoMdAddCircleOutline
                            className="icon"
                            onClick={this.addNewTrack}
                        />
                </td>
            )
        }
    }

    render() {
        return (
            <tr className="search-item">
                <td>{this.props.track.title}</td>
                <td>{this.props.track.artist}</td>
                <td>{this.props.track.album}</td>
                <td>{this.props.track.duration}</td>
                {this.renderIcon()}
            </tr>
        )
    }
}

export default Track;

