import React from 'react'
import WithAuth from '../../Layout/WithAuth';
import './About.css'
function About() {
  return (
    <>
    <div id="about">
    <h1>About Us</h1>
    <br/>
    <p>
    Welcome to Book Verse, a haven for book enthusiasts and a treasure trove of literary wonders. At Book Verse, we're on a mission to kindle the flames of imagination and knowledge by offering an exquisite selection of books for both buying and selling.
    </p>
    <br/>
    <h4>Our Essence</h4>
    
    <p>At the heart of Book Verse lies a deep passion for literature. We understand that books are not merely objects; they are gateways to new perspectives, emotions, and universes waiting to be explored. With a keen eye for quality and a love for the written word, we bring you a handpicked collection that resonates with the discerning reader.
    </p>
    <br/>

    <h4>Our Vision</h4>
    <p>
    As we move forward, our vision is to continue being a sanctuary for book enthusiasts. We aspire to be your first port of call whenever you embark on a literary adventure, your trusted source for literary recommendations, and a place that sparks conversations around the written word.
    
    Thank you for joining us on this odyssey of reading and exploration. Together, let's celebrate the beauty of books and the stories that shape us.
    
    Warmly,
    </p>
    <h4>Important Announcement </h4>
    <p>This not any official Website 
      this website is just make for only learning  purpose 
    </p>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
    <div id="designation">
    <b>Amit Kachhatiya
    Founder, Book Verse
    <br/>
    @Siuuuuuu Developers</b>
    </div>
    </div>
    </>
  )
}
// export default About
export default WithAuth(About)