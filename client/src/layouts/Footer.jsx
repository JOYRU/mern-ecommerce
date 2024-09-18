import React from 'react'

const Footer = ()=> {
  return (
    <footer className='footer flex-space-around'>
        <div className='flex-space-around'>
            <label htmlFor="subscribe">Subscribe to newsletter: </label>
            <input type="email" name="subscribe"
             id="subscribe" placeholder='Your Email address'/>
             <button type="submit" className='btn-subscribe'>
                subscribe
             </button>
        </div>
    </footer>
  )
}


export default Footer