import React, { Component } from 'react';
import getPokemons from '../utils/restApi';
import getPokemon from '../utils/restApiPokemon';
import battleFunc from '../utils/battle';
import Button from '../components/button/button';
import ProgressBar from '../components/progressBar/progress';
import styles from './index.module.css';
import audio from '../assets/hit.wav';

class BattlePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.match.params.name,
      pokemon: {},
      HP: '',
      image: '',
      attack: '',
      defense: '',
      nameRandom: '',
      HPRandom: '',
      imageRandom: '',
      attackRandom: '',
      defenseRandon: '',
      isOver: false,
      message: '',
      myTurn: false,
      speed: '',
      speedRandom: '',
      initialHPBar: '',
      initialHPBarRandom: '',
      blink: false,
      blink2: false,
      firstMove: true,
    };
  }

  getInfo = async () => {
    const allPokemons = await getPokemons();
    const pokemons = allPokemons.results;
    let selectedPokemon;

    pokemons.forEach((el) => {
      if (el.name === this.state.name) {
        selectedPokemon = el;
      }
    });

    const pokemonInfo = await getPokemon(selectedPokemon.url);

    //Choose random pokemon from the others

    const random = Math.floor(Math.random() * pokemons.length);
    const pokemonRandom = pokemons[random];
    const otherPokemon = await getPokemon(pokemonRandom.url);

    //Changing state

    this.setState({
      pokemon: pokemonInfo,
      image: pokemonInfo.sprites.back_default,
      HP: pokemonInfo.stats[0].base_stat,
      attack: pokemonInfo.stats[1].base_stat,
      defense: pokemonInfo.stats[2].base_stat,
      nameRandom: pokemonRandom.name,
      HPRandom: otherPokemon.stats[0].base_stat,
      imageRandom: otherPokemon.sprites.front_default,
      attackRandom: otherPokemon.stats[1].base_stat,
      defenseRandon: otherPokemon.stats[2].base_stat,
      speed: pokemonInfo.stats[5].base_stat,
      speedRandom: otherPokemon.stats[5].base_stat,
      initialHPBar: pokemonInfo.stats[0].base_stat,
      initialHPBarRandom: otherPokemon.stats[0].base_stat,
    });

    if (this.state.speed > this.state.speedRandom) {
      this.setState({
        myTurn: true,
      });
    }
  };

  //Music Hit
  music = () => {
    const audioFile = new Audio(audio);
    audioFile.play();
  };

  //Battle

  battle = async (option) => {
    this.setState({
      firstMove: false,
    });

    let result;
    if (option === 'random') {
      result = battleFunc(
        this.state.HP,
        this.state.attackRandom,
        this.state.defense
      );

      if (result <= 0) {
        this.setState({
          isOver: true,
          message: 'You Lose!',
          HP: 0,
          blink: true,
          blink2: false,
          firstMove: true,
        });
      } else {
        this.setState({
          HP: result.toFixed(2),
          myTurn: true,
          blink: true,
          blink2: false,
        });
      }
    } else {
      result = battleFunc(
        this.state.HPRandom,
        this.state.attack,
        this.state.defenseRandon
      );
      if (result <= 0) {
        this.setState({
          isOver: true,
          message: 'You Win!',
          HPRandom: 0,
          blink2: true,
          blink: false,
          firstMove: true,
        });
      } else {
        this.setState({
          HPRandom: result.toFixed(2),
          myTurn: false,
          blink2: true,
          blink: false,
        });
      }
    }
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    let color;
    let colorRandom;

    if (this.state.HP / this.state.initialHPBar < 0.1) {
      color = 'red';
    } else if (this.state.HP / this.state.initialHPBar < 0.5) {
      color = 'yellow';
    } else {
      color = 'green';
    }

    if (this.state.HPRandom / this.state.initialHPBarRandom < 0.1) {
      colorRandom = 'red';
    } else if (this.state.HPRandom / this.state.initialHPBarRandom < 0.5) {
      colorRandom = 'yellow';
    } else {
      colorRandom = 'green';
    }

    return (
      <div className={styles.battle}>
        <h1>Battle Arena</h1>
        <h2>
          {this.state.name.toUpperCase()} Vs. {''}
          {this.state.nameRandom.toUpperCase()}
        </h2>
        <main>
          <ul className={styles.list}>
            <li className={styles.pokemon}>
              <div className={styles.image}>
                {this.state.isOver || this.state.firstMove ? (
                  <img src={this.state.image} alt='Pokemon' />
                ) : this.state.blink ? (
                  <div>
                    <img
                      src={this.state.image}
                      alt='Pokemon'
                      className={styles.battleImage}
                    />
                    <img src={this.state.imageRandom} alt='Pokemon' />
                  </div>
                ) : (
                  <div className={styles.div}> </div>
                )}
              </div>
              <div>
                <h2>{this.state.name.toUpperCase()}</h2>
              </div>
              <div>
                <h4>Health Points: {this.state.HP}</h4>
                <ProgressBar
                  HP={this.state.HP}
                  initialHPBar={this.state.initialHPBar}
                  color={color}
                />
              </div>
              {this.state.myTurn ? (
                <button onClick={() => this.battle() && this.music()}>
                  Attack!
                </button>
              ) : null}
            </li>
            <li className={styles.pokemon}>
              <div className={styles.image}>
                {this.state.isOver || this.state.firstMove ? (
                  <div>
                    <img src={this.state.imageRandom} alt='Pokemon' />
                  </div>
                ) : this.state.blink2 ? (
                  <div>
                    <img src={this.state.image} alt='Pokemon' />
                    <img
                      src={this.state.imageRandom}
                      alt='Pokemon'
                      className={styles.battleImage}
                    />
                  </div>
                ) : (
                  <div className={styles.div}> </div>
                )}
              </div>
              <div>
                <h2>{this.state.nameRandom.toUpperCase()}</h2>
              </div>
              <div>
                <h4>Health Points: {this.state.HPRandom}</h4>
                <ProgressBar
                  HP={this.state.HPRandom}
                  initialHPBar={this.state.initialHPBarRandom}
                  color={colorRandom}
                />
              </div>
              {!this.state.myTurn ? (
                <button onClick={() => this.battle('random') && this.music()}>
                  Attack!
                </button>
              ) : null}
            </li>
          </ul>
          <div className={styles.message}>
            {this.state.isOver ? this.state.message : null}
          </div>
          <div>
            {' '}
            {this.state.isOver ? (
              <div className={styles.playAgain}>
                <Button title='Play Again' href='/home' />
              </div>
            ) : null}
          </div>
        </main>
      </div>
    );
  }
}

export default BattlePage;
