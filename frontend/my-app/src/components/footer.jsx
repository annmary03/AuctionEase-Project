import React from 'react';
import './footer.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section contact">
                <h3>Contact Us</h3>
                <i><p>Have questions or feedback? </p><p>Contact us via email or phone</p></i>
                <p>Email: auctionease@gmail.com</p>
                <p>Phone: +91 1234567890</p>
            </div>
            <div className="footer-section about">
                <h3>About Us</h3>
                <p>At Auction Ease, we specialize in effortless auction management services,</p>
                <p> ensuring a seamless experience for buyers and sellers alike.</p>
            </div>
            <div className="footer-section social">
                <h3>Follow Us</h3>
                <div className="social-icons">
                    <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                    {/* Add more social media icons as needed */}
                </div>

            </div>
        </footer>
    );
}

export default Footer;
