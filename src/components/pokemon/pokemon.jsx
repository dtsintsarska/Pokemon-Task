import React, { Component } from 'react';
import getPokemon from '../../utils/restApiPokemon';
import styles from './index.module.css';
import Button from '../../components/button/button';

class Pokemon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      url: props.url,
      name: props.name.toUpperCase(),
      moves: [],
      ability: '',
      stats: [],
    };
  }

  getInfo = async () => {
    const info = await getPokemon(this.state.url);
    const sprites = info.sprites;
    const pic = sprites.front_default;

    const moves = info.moves.slice(0, 4);
    let ability = '';
    for (let i = 0; i < info.abilities.length; i++) {
      const element = info.abilities[i];
      if (element.is_hidden === false) {
        ability = element.ability.name;
        break;
      }
    }

    const stats = info.stats;

    this.setState({
      image: pic,
      moves,
      ability,
      stats,
    });
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    return (
      <li className={styles.pokemon}>
        <div className={styles.image}>
          <img src={this.state.image} alt='Pokemon' />
        </div>
        <div>
          <h3>Name: {this.state.name}</h3>
        </div>
        <div>Ability: {this.state.ability}</div>
        <div>
          {this.state.moves.map((move, index) => {
            return (
              <p>
                Move {index + 1}: {move.move.name}
              </p>
            );
          })}
        </div>
        <div>
          {this.state.stats.map((stat) => {
            return (
              <p>
                {stat.stat.name}: {stat.base_stat}
              </p>
            );
          })}
        </div>
        <div className={styles.buttons}>
          <div>
            <Button
              title='Select'
              href={`/battle/${this.state.name.toLowerCase()}`}
            />
          </div>
        </div>
      </li>
    );
  }
}

export default Pokemon;
