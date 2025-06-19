import React from "react";
import Slider from "react-slick";

const HomeBanner =()=>{
     var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow:true,
    autoplay:true,
  };
    return(
      <>
      <div className="homeBannerSection">
        <Slider {...settings}>
           <div className="item">
            <img src="https://cmsimages.shoppersstop.com/Tommy_Hilfiger_Static_web_13a06de33f/Tommy_Hilfiger_Static_web_13a06de33f.png" className="w-100"/>
            </div> 
            <div className="item">
            <img src="https://cmsimages.shoppersstop.com/Allen_solly_web_891ab7d242/Allen_solly_web_891ab7d242.png" className="w-100"/>
            </div> 
            <div className="item">
            <img src="https://cmsimages.shoppersstop.com/Narisco_and_Lacoste_web_4add15f498/Narisco_and_Lacoste_web_4add15f498.png" className="w-100"/>
            </div>
            <div className="item">
            <img src="https://cmsimages.shoppersstop.com/Stop_Kashish_and_more_web_51d6d100d0/Stop_Kashish_and_more_web_51d6d100d0.png" className="w-100"/>
            </div>
              <div className="item">
            <img src="https://cmsimages.shoppersstop.com/CC_web_aa47d111a4/CC_web_aa47d111a4.png" className="w-100"/>
            </div>
        </Slider>

      </div>

     </>
    )
}
export default HomeBanner;