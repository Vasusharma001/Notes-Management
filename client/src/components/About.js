import React from 'react'

const About = (props) => {
  return (
    <div className={`container my-3 bg-${props.mode}`}>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className={`accordion-item bg-${props.mode}`}  >
            <h2 className="accordion-header" >
              <button className={`accordion-button collapsed text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`}  type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Made by:
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body"><code>Lakshay Nijhawan</code></div>
            </div>
          </div>
          <div className={`accordion-item bg-${props.mode}`} >
            <h2 className="accordion-header">
              <button className={`accordion-button collapsed text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`}  type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Tech Stack Used:
              </button>
            </h2>
            <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body"><code> Front End : React JS + Bootstrap</code></div>
              <div className="accordion-body"><code> Back End : Node JS + Express JS</code></div>
              <div className="accordion-body"><code> Database : Mongo DB</code></div>
            </div>
          </div>
          <div className={`accordion-item bg-${props.mode}`} >
            <h2 className="accordion-header">
              <button className={`accordion-button collapsed text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`}  ype="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Things Learnt
              </button>
            </h2>
            <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body"><code>Basics of MERN stack</code></div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default About