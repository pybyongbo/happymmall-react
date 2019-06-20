import React from 'react';
import ReactLoading from 'react-loading';
import './index.scss'
const Loading = ({ type, color,className }) => (
    <ReactLoading type={type} color={color} className={className}/>
);
 
export default Loading;