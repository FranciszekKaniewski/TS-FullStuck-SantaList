import {Link, Route, Routes } from "react-router-dom";
import {ChildrenView} from '../../views/ChildrenView'
import {PresentsView} from '../../views/PresentsView'
import {AddPresentView} from "../../views/AddPresentView";


export const MainBoard = () => {

    return(
        <>
        <h2>MainBoard!</h2>
            <ul>
                <li><Link to="/children">Children</Link></li>
                <li><Link to="/presents">Presents</Link></li>
                <li><Link to="/add-present">Add Present</Link></li>
            </ul>
        <Routes>
            <Route path='/children'element={<ChildrenView/>}/>
            <Route path='/presents'element={<PresentsView/>}/>
            <Route path='/add-present'element={<AddPresentView/>}/>
        </Routes>
        </>
    );
}