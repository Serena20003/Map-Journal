import Button from "./Components/Button";
import { useMode } from "./Utils/ModeContext";

const SideBar = () => {

    const {mode, setMode} = useMode();
    return ( 
        <>
        <div>sidebar</div>
        <Button className="sidebarButton" text="View" action={() => {setMode("View")}}></Button>
        <Button className="sidebarButton" text="Point" action={() => {setMode("Point")}}></Button>
        </>

    );
}
 
export default SideBar;