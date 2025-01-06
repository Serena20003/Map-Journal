import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { useMode } from "../Utils/ModeContext";
import { useAuth } from "../Utils/AuthContext";
import GalleryMapCard from "../Components/GalleryMapCard.js";
import { collection, query, getDocs, collectionGroup } from "firebase/firestore";
import { dbIns } from '../Utils/firebaseConfig';
import { useEffect, useState } from "react";
const Gallery = ({setMapName}) => {
    const { setMode, mode } = useMode();
    setMode("gallery");
    const {currentUser} = useAuth();
    const [mapIDs, setMapIDs] = useState([]);    
    const navigate = useNavigate();
    const collRef = collection(dbIns, currentUser.uid);
    // TODO: debug ahhhh
    const qu = async () => {
        const querySnapshot = await getDocs(collRef).catch(console.error);
        
        const newMapIDs = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          newMapIDs.push(doc.id);
        }); 
        setMapIDs(newMapIDs);
      };

    useEffect(() => {
        qu();
      }, []);
    return (  
        <>
        {/* show all maps like cards and pass name of the map */}
        {mapIDs.map((mapID) => {
            // apparently map needs return
            return <GalleryMapCard mapID={mapID} setMapName={setMapName} />
        })}
        </>
    );
}
 
export default Gallery;