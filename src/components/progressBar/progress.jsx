import React, { Component } from 'react';
import styles from './index.module.css';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      HP: this.props.HP,
      initialHPBar: this.props.initialHPBar,
      color: this.props.color,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        HP: this.props.HP,
        initialHPBar: this.props.initialHPBar,
        color: this.props.color,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.color === 'red' ? (
          <progress
            className={styles.red}
            id='health'
            value={this.state.HP}
            max={this.state.initialHPBar}
          ></progress>
        ) : null}
        {this.state.color === 'yellow' ? (
          <progress
            className={styles.yellow}
            id='health'
            value={this.state.HP}
            max={this.state.initialHPBar}
          ></progress>
        ) : null}
        {this.state.color === 'green' ? (
          <progress
            className={styles.green}
            id='health'
            value={this.state.HP}
            max={this.state.initialHPBar}
          ></progress>
        ) : null}
      </div>
    );
  }
}

export default ProgressBar;
