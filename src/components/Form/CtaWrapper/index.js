import React from 'react'
import "./index.scss";

const CtaWrapper = (props) => {
  return (
    <div className={`cta-wrapper ${props.className}`}>
        {props.children}
    </div>
  )
}

export default CtaWrapper