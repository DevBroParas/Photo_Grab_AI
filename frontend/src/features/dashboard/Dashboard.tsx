import CreateEventButton from "./components/CreateEventButton";
import GetEvents from "./components/GetEvents";


const dashboard = () => {
    return ( <div>
        <h1>Dashboard</h1>
        <CreateEventButton />
        <GetEvents /> 
    </div> );
}
 
export default dashboard;