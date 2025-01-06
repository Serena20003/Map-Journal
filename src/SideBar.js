import { doc, getDoc, setDoc } from "firebase/firestore";
import Button from "./Components/Button";
import { useMode } from "./Utils/ModeContext";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { dbIns } from "./Utils/firebaseConfig";
import { useAuth } from "./Utils/AuthContext";

/*
Modes:
mapView
pointEdit
pointView
journalEdit
journalView
dashboard
gallery
hide
*/
const SideBar = ({mapName, setMapName, geoPoint, setGeoPoint}) => {

    const {mode, setMode} = useMode();
    const [show, setShow] = useState(false);
    const [mapNameUnique, setMapNameUnique] = useState(true);
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setMapName("");
        setMapNameUnique(true);
    };
    const createNewMap = async () => {
        const docRef = await getDoc(doc(dbIns, currentUser.uid, mapName));
        if (docRef.exists()) {
            setMapNameUnique(false);
        } else {
            await setDoc(doc(dbIns, currentUser.uid, mapName), {}).then(() => {
                handleClose();
                navigate('/map', {state:  {mapID: mapName}});
            })
        }
    }
    return ( 
        <div className="sidebar">
        {mode==="gallery" && 
        <>
        <h1>Gallery</h1>
        <Button className="sidebarButton" text="Add New Map" action={handleShow} />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Map</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
                {/* to do to show error message for not-unique map name */}
                <label>Map Name:</label>
                <input autoFocus name="mapName" value={mapName} onChange={(e) => setMapName(e.target.value)} />
            </form>
            {!mapNameUnique && <em>Inputted map name already exists, please try again.</em>}
          </Modal.Body>
          <Modal.Footer>
            <Button className="secondaryButton" text="Cancel" action={handleClose}/>
            <Button className="primaryButton" text="Add Map" action={createNewMap}>
              Add Map
            </Button>
          </Modal.Footer>
        </Modal>
        <Button className="sidebarButton" text="Filter" />
      </>}
        {mode === "pointEdit" && 
        <>
        <Button className="sidebarButton" text="View" action={() => {setMode("pointView")}}></Button>
        </>}
        {mode === "mapView" && 
        <>
        <Button className="BackButton" text="Back" action={() => navigate('/gallery')} />
        <h1>{mapName}</h1>
        <Button className="sidebarButton" text="Add New Point" action={() => {setMode("pointEdit")}}></Button>
        </>}
        </div>

    );
}
 
export default SideBar;