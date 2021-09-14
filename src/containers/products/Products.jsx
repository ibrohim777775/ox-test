import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {Table, Input} from 'antd';

import './style.css'

const Products = () => {
  const [token,setToken]= useState('');
  const [cookies,setCookies] = useCookies(['token']);
  const [data,setData]= useState(['']);
  const [bufer, setBufer] = useState([...data]);
  const [keyForSearch, setKeyForSearch] = useState('');

  const URL_FOR_DATA = 'https://face.ox-sys.com/variations';
  const params = {
    size: 1,
    page: 2,
    stock: {
      exist: true,
      location: [42]
    }
  }
  
  const getData = (token=cookies.token) => {
    axios.interceptors.request.use(
      config=>{
        config.headers.authorization = `Bearer ${token}`;
        return config
      },
      error=>{
        return Promise.reject(error)
      }
    )
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer {${token}}`
      }
    };
    axios.get(URL_FOR_DATA, params, config)
      .then(res=>{
        // console.log(res.data);
        setData([...res.data.items]);
        setBufer([...res.data.items])
      })
      .catch(err=> console.log(err))
  }
  useEffect(() => {
    setToken(cookies.token);
    // console.log(cookies.token);
    getData(cookies.token)
   
  }, []);
  const onChangeHandler = (e) =>{
    setKeyForSearch(e.target.value);
    let key = e.target.value.trim().toUpperCase();
    let newArr = key.length > 0 ? bufer.filter(product=>{
      if (product.name.toUpperCase().indexOf(key)>0 || product.name.toUpperCase().indexOf(key)===0) return {...product};
    }) : [...data];
    // if (key.length > 0){ data.map(product=> {
    //   let name = product.name.toUpperCase();
    //   // console.log(key,'keyyy');
    //   // console.log(name, 'nameee');
    //   if (name.indexOf(key)>=0 ) newArr.push({...product});
    // })}else [...data];
    console.log(newArr,'newarrr');
    setBufer(newArr.sort());
  }
  
  const columns = [
    {
      title: 'Названые товара',
      dataIndex: 'name',
      width: 150
    }, 
    {
      title: 'Цена товара',
      dataIndex: 'stocks[0].sellPrice.UZS',
      width: 150
    },
    {
      title: 'Фото товара',
      dataIndex: 'images[0].urls.300x_',
      width: 150
    }
  ];
  
  // console.log(token)
  // console.log(data,'----dataaa')
  return (
    <div className='products'>
      <h1>Hello </h1>
      <Input type="text" className="search" placeholder='Поиск товара по имени' onChange={onChangeHandler} />
      <Table  columns={columns} dataSource={bufer} pagination={{ pageSize: 5 }} scroll={{ y: 840 }} />
    </div>
  );
}

export default Products;
//Join Zoom Meeting
// https://us05web.zoom.us/j/9923085963?pwd=N3F1a3NZZlRxOER6c1FCYmd1cnNoQT09
// 
// Meeting ID: 992 308 5963
// Passcode: H287SC



