import Card from 'react-bootstrap/Card';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const GalleryMapCard = ({mapID="No Name", setMapName}) => {
  const nav = useNavigate();
  const deleteMap = () => {

  };
  return ( 
    <>
        <Card bg='light' text='dark' border='dark' style={{ width: '9rem', height: '7rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{mapID}</Card.Title>
          <Card.Text></Card.Text>
          <Button className="galleryMapCardButton" action={() => {
            setMapName(mapID);
            nav("/map", {state: {mapID: mapID}});
            }} text="Edit"/>
          <Button className="galleryMapCardButton" action={deleteMap} text="Delete"/>
        </Card.Body>
      </Card>
      </>
   );
}
 
export default GalleryMapCard;