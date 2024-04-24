// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Slidebar() {

  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem('token')
     navigate('/login')
  }

  return (
    <div>
      <p>Slidebar</p>
      <button onClick={logOut} className='btn btn-danger'>logout</button>
    </div>
  );
}
