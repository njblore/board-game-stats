import React from 'react';
import './header.css';

const Header = (props: { imageUrl: string }) => {
  return (
    <div className="page-header grid-header header">
      <div className="image-container">
        <img src={props.imageUrl} alt="header"></img>
      </div>
    </div>
  );
};

export default Header;
