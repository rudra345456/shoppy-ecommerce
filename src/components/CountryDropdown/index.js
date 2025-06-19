import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import { FiSearch } from "react-icons/fi";
import { FaRegWindowClose } from "react-icons/fa";
import { useState } from 'react';
import Slide from '@mui/material/Slide';
import { MyContext } from '../../App';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const CountryDropdown=()=>{


  const[isOpenModal,setisOpenModal] = useState(false);
  const[selectedTab,setselectedTab] = useState(null);

  const[countryList,setCountryList] =useState([]);

  const context =useContext(MyContext);
const [keyword, setKeyword] = useState('');

  const selectCountry=(index)=>{
    setselectedTab(index);
    setisOpenModal(false);
  }

  useEffect(()=>{
    if (context.CountryList) {
      setCountryList(context.CountryList);}
       
  },[context.CountryList]);
    
 const filterList = (e) => {
  const keyword = e.target.value.toLowerCase();
  setKeyword(keyword);

  if (context && context.CountryList) {
    const filtered = context.CountryList.filter((item) =>
      item.country.toLowerCase().includes(keyword)
    );
    setCountryList(filtered);
  }
};

  
const selectedCountryName = selectedTab !== null && countryList[selectedTab]
  ? countryList[selectedTab].country.substr(0,10)+'...'
  : 'Select Country';


     return(
        <>
      <Button className='countryDrop' onClick={()=>setisOpenModal(true)}>
            <div className='info d-flex flex-column'>
                 <span className='label'>your location</span>
                 <span className='name'>{selectedCountryName}</span>
            </div>

                 <span className='ml-auto'><FaAngleDown/></span>
     </Button>

   <Dialog  open={isOpenModal} onClose={()=>setisOpenModal(false)} 
   className='LocationModal'TransitionComponent={Transition}>
           <h4 className='mb-0'>Choose your Delivery Location</h4>
          <p>Enter your address and we will specify the offer for your area </p>
          <Button className='close_' onClick={()=>setisOpenModal(false)}><FaRegWindowClose /></Button>


       <div className='headerSearch w-100'>
                <input type='text' placeholder='Search your area ... ' onChange={filterList}/>
                <Button><FiSearch /></Button>
      </div>

              <ul className='CountryList mt-3'>
                {
                  countryList?.length!==0 && countryList?.map((item,index)=>(
                       <li key={index}> <Button onClick={()=>selectCountry(index)}
                       className={`${selectedTab===index ?'active':''}`}
                       >{item.country}</Button></li>
                    ))
                  }
                
               
                

              </ul>

   </Dialog>
  
     </>

  )
}


export default CountryDropdown;