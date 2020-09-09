import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './map.css'
import SpinnerContainer from '../../../ui/Spinner'
import googleMapStyles from "./maps-style"
export class MapContainer extends Component {

    constructor (props){
        super (props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            activeEvent: {},
            defaultLocation: {lat: 41.38879, lng: 2.15899}
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true,
            activeEvent: this.props.markers.filter(event => event._id === marker.id)[0]
        })

    };

    onInfoWindowClose = () => {
        this.setState({
            activeMarker: {},
            showingInfoWindow: false
        })
    }

    render() {
        const { google } = this.props
        const centerLocation = this.props.currentLocation.lat ? this.props.currentLocation : this.state.defaultLocation
        return (
          <div></div>
        /*<Map google={this.props.google} zoom={14} styles={this.props.mapStyle} initialCenter={centerLocation}>
            {this.props.markers.map(marker => 
                <Marker onClick={this.onMarkerClick}
                    key={marker._id}
                    id={marker._id}
                    icon={
                        {
                            url: "https://res.cloudinary.com/duimkcb6n/image/upload/v1598481769/pin_s3vnej.png",
                            anchor: new google.maps.Point(32, 32),
                            scaledSize: new google.maps.Size(40, 46)
                        }
                    }
                />
            )}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}>
                {this.state.activeEvent.owner ? 
                <article className='maps-card'>
                    <article><img src={this.state.activeEvent.avatar} alt={this.state.activeEvent.name}></img></article>
                    <h4>{this.state.activeEvent.name}</h4>
                    <span className="color-text-black">Creator:</span>  {this.state.activeEvent.owner.username}  |   <span className="color-text-black">Participants:</span>  {this.state.activeEvent.participants.length}<br></br><br></br>
                    <span className="color-text-black">City:</span>  {this.state.activeEvent.city}  |  <span className="color-text-black">Local:</span>  {this.state.activeEvent.acceptedOffer.local.name}
                </article> : <SpinnerContainer />
                }
            </InfoWindow>
        </Map>*/
      );
    }
  }
MapContainer.defaultProps = googleMapStyles
export default GoogleApiWrapper({
  apiKey: "AIzaSyD2tftgnTUYdhrwjq72BaT5tM0DiKo7Hn4"
})(MapContainer)

