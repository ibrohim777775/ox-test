import axios from 'axios';
import { useCookies } from 'react-cookie';

import {FaUserAlt, FaArrowRight} from 'react-icons/fa';
import {RiKeyFill} from 'react-icons/ri';
import './style.css';


import React, { useState } from 'react';
import { Redirect } from 'react-router';

const SUBDOMAIN = 'face';
const URL_FOR_AUTH = `https://${SUBDOMAIN}.ox-sys.com/security/auth_check`;

//  https://${SUBDOMAIN}.ox-sys.com/security/auth_check
const Auth = () => {
  const [items, setItems] = useState({login:'', password: ''});
  const [error, setError] = useState(false);
  const [cookies,setCookies] = useCookies(['token']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getToken = (items) =>{
    const params = new URLSearchParams()
    params.append('_username', items.login);
    params.append('_password',items.password);
    params.append('_subdomain', 'face');
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post(
      URL_FOR_AUTH,params,config
    )
    .then(res=>{
      // console.log(res.data)
      if (res.status === 200){
        setError(false);
        console.log('avtorizatsiyadan otdingiz');
        localStorage.setItem('username',items.login);
        setCookies('token', res.data.token,{path:'/', maxAge: res.data.lifetime});
        setTimeout(() => {
          setIsLoggedIn(true);
          
        }, 3000);
      };
      
    })
    .catch(err=> {
      console.log(err)
      setError(true)
    })
  };
  const submitHandler = (e) =>{
    e.preventDefault();
    // console.log(items)
    
    if (items.login.trim().length < 3 || items.password.trim().length<3){
      setError(true);
    } else getToken(items);
  }
  
  const onChangeHandler = (e)=>{
    setError(false)
    setItems({...items, [e.target.name]: e.target.value});
    // console.log(items)
  }
  const keyPressHandler = (e) =>{
    // console.log(e.code)
    if (e.code === 'Enter'){
      if (items.login.trim().length < 3 || items.password.trim().length<3){
        setError(true);
      } else getToken(items);
    }
  }
  
  return (
    <div className='auth'>
      <div className="auth__main">
        <form  className="auth__form">
          <div className="form__group">
            <FaUserAlt className='user-icon'/>
            <input name='login' onChange={onChangeHandler} type="text" className="form__input" placeholder='Имя ползователья'  />
          </div>
          <div className="form__group">
            <RiKeyFill className='key-icon'/>
            <input name='password' onChange={onChangeHandler} onKeyPress={keyPressHandler} type="password" className="form__input" placeholder='Пароль' />
          </div>
          <button onClick={(e)=>submitHandler(e,true)} type='submit' className="form__button">
            <FaArrowRight/> 
          </button>
          <p className="error">{error ? 'Неверный логин или пароль' : ''}</p>
          {isLoggedIn ? <Redirect to='/products'/>  : ''}
        </form>
      </div>
      <div className="auth__top"></div>
      <div className="auth__bottom"></div>
    </div>
  );
}

export default Auth;
