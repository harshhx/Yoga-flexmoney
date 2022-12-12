import React from 'react'
import './footer.css'

const Footer= () =>{
    return(
        <footer>
            <a href="https://www.theharshgupta.co.in/" className='footer_logo' target="_blank">Harsh Gupta </a>

            <div className="footer_copyright">
                <small>&copy; Harsh Gupta. All rights reserved</small>
            </div>
        </footer>
    );
}

export default Footer