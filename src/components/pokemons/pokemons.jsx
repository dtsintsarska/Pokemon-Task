import React, { Component } from 'react';
// import styles from './index.module.css';
import Pokemon from '../pokemon/pokemon';
import getPokemons from '../../utils/restApi';
import styles from './index.module.css';

class Pokemons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
    };
  }

  getAllPokemons = async () => {
    const pokemonsAll = await getPokemons();

    this.setState({
      pokemons: pokemonsAll.results,
    });
  };

  renderPokemons() {
    let { pokemons } = this.state;

    return pokemons.map((pokemon) => {
      return <Pokemon key={pokemon.name} {...pokemon} />;
    });
  }

  componentDidMount() {
    this.getAllPokemons();
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps) {
  //     this.setState({
  //       result: this.props.result,
  //       title: this.props.title.toUpperCase(),
  //     });
  //   }
  // }

  render() {
    return (
      <section>
        <ul>{this.renderPokemons()}</ul>
      </section>
    );
  }
}

export default Pokemons;
