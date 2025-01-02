// React Leaflet is not compatible with server-side rendering
import { MapContainer, TileLayer, useMapEvents, Popup, Marker } from 'react-leaflet';
import { useState } from 'react'
import { useAuth } from '../Utils/authContext';

function LocationMarker({currentUser=null}) {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate();
        console.log(currentUser);
      },
      locationfound(e) {
        setPosition(e.latlng)
        console.log(position);
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? (<></>) : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    // <>
    // </>
    )
  }

const Map = () => {
    const { currentUser } = useAuth();
    console.log(`test: ${currentUser}`);
    return ( 
      <>
      {currentUser &&  
        <>
          <MapContainer className="map" center={[51.505, -0.09]} zoom={13}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data © OpenStreetMap contributors"
            />
            <Marker position={[51.5, -0.09]}>
                <Popup>A pretty popup.</Popup>
            </Marker>
            <LocationMarker currentUser={currentUser} />
        </MapContainer>
        </>
      }
      {!currentUser && <div>Not logged in</div>}
      </>
    );
}
 
export default Map;


// const geoJson = {
//     "type": "Feature",
//     "properties": {
//         "name": "Coors Field",
//         "amenity": "Baseball Stadium",
//         "popupContent": "This is where the Rockies play!"
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [-104.99404, 39.75621]
//     }
// }