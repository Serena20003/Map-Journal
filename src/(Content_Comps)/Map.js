// React Leaflet is not compatible with server-side rendering
import { MapContainer, TileLayer, useMapEvents, Popup, Marker } from 'react-leaflet';
import { useAuth } from '../Utils/AuthContext';
import { dbIns } from '../Utils/firebaseConfig';
import { getDocs, collection, addDoc, GeoPoint, Timestamp, query, where} from "firebase/firestore"; 
import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { useMode } from '../Utils/ModeContext';

function LocationMarker({currentUser=null}) {
  const [positions, setPositions] = useState([]);
  const { mode, setMode } = useMode();
  const mapID = "map ID 1";
  const [dataType, setDataType] = useState("Geo Data")
  const collRef = collection(dbIns, currentUser.uid, mapID, dataType);
  const map = useMapEvents({
    // do point only first
    async click(ev) {
      if (mode === "Point") {
        const { lat, lng } = ev.latlng;
        const docRef = await addDoc(collRef, {
          "Connect_to": null,
          "Coord": new GeoPoint(lat, lng),
          "Date": Timestamp.fromDate(new Date()),
          "Name": "test point",
          "Type": mode
        }).then(() => {
          q();
        })
      }
    }
  })
  const q = async () => {
    const querySnapshot = await getDocs(query(collRef, where("Type", "==", "Point"))).catch(console.error);
    const newPos = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      newPos.push(new LatLng(doc.data().Coord.latitude, doc.data().Coord.longitude));
    }); 
    setPositions(newPos);
  }

  useEffect(() => {
    q();
  }, []);
  return positions.length === 0 ? (<></>) : (
    <>
    {positions.map((pos) => (
      <Marker position={pos}>
      <Popup>
        There is rows content. <br /> {pos.toString()}
      </Popup>
    </Marker>
    ))}
    
    </>
    )
  }

const Map = () => {
    const { currentUser } = useAuth();
    return ( 
      <>
      {currentUser &&  
        <>
          <MapContainer className="map" center={[51.505, -0.09]} zoom={13}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data © OpenStreetMap contributors"
            />
            {/* <Marker position={[51.5, -0.09]}>
                <Popup>A pretty popup.</Popup>
            </Marker> */}
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