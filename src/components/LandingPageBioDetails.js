import React from 'react';
import { SF } from '../styles/theme';

const LandingPageBioDetails = () => {
  return <section
  style={SF.darkText}
  >
  Joel's been working as a lead SWE for some length of time. Really familiar with wide range of tools. Now, he's digging into security.
    <br />
    <br />
    More about Joel:
    {` `}
    <a href='https://www.linkedin.com/in/7oelm/'>{`Linkedin`}</a>
    {`, `}
    <a href='https://medium.com/@9oelm'>{`Medium`}</a>
  </section>  
}

export default LandingPageBioDetails
