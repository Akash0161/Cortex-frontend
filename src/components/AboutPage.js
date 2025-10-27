import React from 'react'
import Navbar from './FEED/Navbar'
// import about from './assets/Aboutimg1.jpeg'
// import aboutimg from './assets/Aboutimg2.jpeg'
import aboutimg1 from './assets/Aboutimg3.jpeg'
import './AboutPage.css'

const AboutPage = () => {
  return (
    <>
   <Navbar showSearch={false}/>
    <div className='AboutPage'>
        <div className='about-img'>
            <img src={aboutimg1} alt='About-img' className='abt-img'/>
        </div>
        <div className='About-content'>
            <h2>About</h2>
            <h3>A Quiet Home for Stories and Ideas</h3>
            <p>

           
            In today’s digital world, information is everywhere. Social media feeds never stop scrolling. Headlines compete for attention. 
            Notifications and trends rise and fall in minutes. The result? The internet often feels more like a noisy marketplace than a place 
            for reflection and meaning.
            <br/>
            At Cortex, we believe there’s another way. We believe that human beings are natural storytellers—that 
            we understand ourselves, each other, and the world through the power of language. But too often, thoughtful voices get lost in
            the chaos. Cortex was built to be a home for those voices: a calm, intentional space where ideas can be explored without 
            distraction, and where writing can do what it does best—connect, inspire, and transform.
            
            </p>
        </div>
        
        
    </div>
     </>
  )
}

export default AboutPage