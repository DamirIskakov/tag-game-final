import { Component } from 'react';
import classes from './App.module.sass';
import Item from './components/Item';

class App extends Component {
  state = {
    field: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, null],
    ],
    turns: 0,
    solved: false,
  };

  componentDidMount() {
    this.startGame();
  }

  moveHandler = (value) => {
    const valuePos = this.findValue(value);
    const nullPos = this.findValue(null);
    if (!this.isChangeble(valuePos, nullPos) || this.state.solved) return;
    const [row1, row2, row3, row4] = this.state.field;
    const newField = [[...row1], [...row2], [...row3], [...row4]];
    newField[valuePos.row][valuePos.colomn] = null;
    newField[nullPos.row][nullPos.colomn] = value;
    const { turns } = this.state;
    const check = this.isSolved(newField);
    this.setState({
      field: newField,
      turns: turns + 1,
      solved: check,
    });
  };

  isSolved = (arr) => {
    const victory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
    return arr.flat().every((val, idx) => val === victory[idx]);
  };

  isChangeble = (valuePos, nullPos) => {
    if (valuePos.row === nullPos.row) {
      if (
        valuePos.colomn === nullPos.colomn + 1 ||
        valuePos.colomn === nullPos.colomn - 1
      ) {
        return true;
      }
      return false;
    } else if (valuePos.colomn === nullPos.colomn) {
      if (
        valuePos.row === nullPos.row + 1 ||
        valuePos.row === nullPos.row - 1
      ) {
        return true;
      }
      return false;
    }
    return false;
  };

  findValue = (value) => {
    const { field } = this.state;
    for (let row in field) {
      if (field[row].includes(value)) {
        const colomn = field[row].indexOf(value);
        return { row: +row, colomn };
      }
    }
  };

  startGame = () => {
    let startArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
    let field = [];

    for (let i = 15; i >= 0; i--) {
      let idx = Math.floor(Math.random() * (i + 1));
      field = field.concat(startArr.splice(idx, 1));
    }
    if (!this.isSolvable(field)) {
      this.startGame();
    }
    for (let i = 0; i < 4; i++) {
      startArr.push(field.splice(0, 4));
    }

    this.setState({
      field: startArr,
      turns: 0,
      solved: false,
    });
  };

  isSolvable = (arr) => {
    let sum = 0;
    const { row } = this.findValue(null);

    for (let i = 0; i < 14; i++) {
      for (let k = i + 1; k < 15; k++) {
        if (arr[i] > arr[k]) {
          ++sum;
        }
      }
    }

    return (sum + row + 1) % 2 ? false : true;
  };

  render() {
    const renderField = () => {
      const { field } = this.state;
      const arr = [];
      for (let row in field) {
        for (let i in field[row]) {
          const item = field[row][i];
          arr.push(
            <Item
              key={item + Math.random()}
              value={item}
              moveHandler={() => this.moveHandler(item)}
            />
          );
        }
      }
      return arr;
    };
    return (
      <div className={classes.App}>
        {this.state.solved ? (
          <div className={classes.Winner}>You WIN!!!</div>
        ) : null}
        <div className={classes.Field}>{renderField()}</div>
        <button className={classes.Restart} onClick={() => this.startGame()}>
          Restart
        </button>
        <span className={classes.Count}>Total turns: {this.state.turns}</span>
      </div>
    );
  }
}

export default App;
