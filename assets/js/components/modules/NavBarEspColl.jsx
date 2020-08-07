import React, {useContext} from 'react';
import Navbar from "react-bootstrap/Navbar";
// Imports Tools React
import AuthContext from "../../contexts/AuthContext";

const NavBarEspColl = () => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);


    return (
        <>
            <Navbar id="op_espcoll_navbar" className="bg-light">
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {(!isAuthenticated && (
                        <>
                        <Navbar.Text>
                            Espace dédié au colleges
                        </Navbar.Text>
                        </>
                    ))
                    ||
                    (
                        <>
                        <Navbar.Text>
                            Collège de : <a>Mark Otto</a>
                        </Navbar.Text>
                        </>
                    )
                    }



                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default NavBarEspColl;