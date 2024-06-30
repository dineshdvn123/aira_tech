import React, {useEffect} from 'react';
import AboutUsImage from '../../assets/AboutUs.png'
import './AboutUs.css';


const AboutUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    return (
        <section className="about-us">
            <div className="about-content">
                <h2>ABOUT US</h2>
                <h3>Short Headline for<br />Company About Section<br />Will Be Here</h3>
                <p>This part will introduce you or your business to website visitors. We'll write about you, your organization, the products or services you offer, and why your company exists.</p>
                <button className="call-to-action">CALL TO ACTION</button>
            </div>
            <div className="about-image">
                <img src={AboutUsImage} alt="About Us" />
            </div>
        </section>
    );
};

export default AboutUs;
