import React from 'react';
import Pokemons from '../components/pokemons/pokemons';
import styles from './index.module.css';

const HomePage = () => {
  return (
    <main className={styles.home}>
      <div>
        <h1>Welcome to Pokemon Battle Game!</h1>
        <h2>Choose your pokemon and prepare for battle</h2>
        <h3>Available Pokemons:</h3>
        <Pokemons />
      </div>
    </main>
  );
};

export default HomePage;
