import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props){
    return(
        <div className="footer">
        <div className="container" style={{bottom:0}}>
            
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright @2020 BrimNet | Privacy Policy | Terms Of Use | Sales And Refunds | Site Map</p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Footer;