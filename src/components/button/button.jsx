import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Button = ({ href, title }) => {
  return (
    <div>
      <Link to={href}>
        <button type='button' className={styles.button}>
          {title}
        </button>
      </Link>
    </div>
  );
};

export default Button;
