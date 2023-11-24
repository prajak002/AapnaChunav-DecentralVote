/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react'
// import SvgComponent from '../../svg/SvgComponent';
import "./card.css";

function Card() {
  return (
    <div class="mx-auto">
  <div class="pricing-block-content">
    <p class="pricing-plan">Your Donation</p>
      <div class="price-value" data-currency="$ USD" data-currency-simple="USD">
        <p class="price-number" style={{color:"black"}}>ETH<span class="price-integer" style={{color:"black"}}>Rank 20</span></p>
        <div id="priceDiscountCent" style={{paddingRight:"90px"}}> 100</div>
      </div>
      
      
  </div></div>
  )
}

export default Card
