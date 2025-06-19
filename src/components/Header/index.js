
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png'; 
import Button from '@mui/material/Button';
import CountryDropdown from '../CountryDropdown';
import { TbUserFilled } from "react-icons/tb";
import { TbShoppingBag } from "react-icons/tb";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import { useContext } from 'react';
import{MyContext} from '../../App';


const Header = () => {

const context = useContext(MyContext)


  return (
    <>
      <div className="headerWrapper">
        <div className="top-strip bg-blue">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              Due to the <b>COVID 19</b> epidemic, orders may be processed with a slight delay
            </p>
          </div>
        </div>
        <header className="header">
          <div className="container">
            <div className="row ">
              <div className="logoWrapper d-flex align-items-center col-sm-2">
                <Link to={'/'}>
                  <img src={Logo} alt='logo' />
                </Link>
              </div>
              <div className='col-sm-10 d-flex align-items-center part2 '>
              {
                context.CountryList?.length!==0 &&<CountryDropdown/>
              }
             

            <SearchBox/>

              <div className='part3 d-flex align-items-center ml-auto'>
                <Button className='circle mr-3'><TbUserFilled /></Button>
                <div className='ml-auto carttab d-flex align-items-center'>
                  <span className='price'>$3.29</span>
                  <div className='position-relative ml-2'>
                    <Button className='circle '><TbShoppingBag /></Button>
                    <span className='count d-flex align-items-center
                     justify-content-center'>1</span>
                  </div>
                </div>
              </div>
               
             </div>
            </div>
          </div>
        </header>
         <Navigation/>

      


      </div>
    </>
  );
};

export default Header;
