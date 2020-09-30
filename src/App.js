import React from 'react';
import * as PIXI from "pixi.js";
import './App.css';
import { handleAI } from './handleAI';
import * as _ from 'lodash';

const colors = [0x666666, 0xff6666, 0x66ff66, 0x6666ff, 0xff66ff, 0x66ffff];

class App extends React.Component {
  pixiContainer = undefined;
  pixiApp = new PIXI.Application({
    width: 450,
    height: 640,
    antialias: true,
    transparent: true
  });
  pixiGraphics;
  tetrisContainer = undefined;
  hasLost = false;
  currentItem = [];
  currentItemX = 0;
  currentItemY = 0;
  timeSinceLastMovement = 0;
  cells = [
  ];

  constructor(props) {
    super(props);
    this.renderPixi = this.renderPixi.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.goRightIfPossible = this.goRightIfPossible.bind(this);
    this.goLeftIfPossible = this.goLeftIfPossible.bind(this);
    this.rotateCurrentItem = this.rotateCurrentItem.bind(this);
    this.resetGame();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
    this.pixiApp.destroy(true, {
      children: true,
      texture: true,
      baseTexture: true
    });
  }

  resetGame() {
    this.cells = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  5
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 15
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 20
    ];
    this.getNewItem();
  }

  getNewItem() {
    const type = Math.floor(Math.random() * 5);

    switch (type) {
      case 0:
        this.currentItem = [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0]
        ];
        this.currentItemX = -1;
        this.currentItemY = -3;
        return;
      case 1:
        this.currentItem = [
          [0, 0, 0, 0],
          [2, 2, 0, 0],
          [0, 2, 2, 0],
          [0, 0, 0, 0]
        ];
        this.currentItemX = 0;
        this.currentItemY = -3;
        return;
      case 2:
        this.currentItem = [
          [3, 0, 0, 0],
          [3, 3, 3, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
        this.currentItemX = 0;
        this.currentItemY = -3;
        return;
      case 3:
        this.currentItem = [
          [0, 0, 0, 0],
          [0, 4, 4, 0],
          [4, 4, 0, 0],
          [0, 0, 0, 0]
        ];
        this.currentItemX = 0;
        this.currentItemY = -3;
        return;
      case 4:
        this.currentItem = [
          [5, 0, 0, 0],
          [5, 0, 0, 0],
          [5, 0, 0, 0],
          [5, 0, 0, 0]
        ];
        this.currentItemX = 0;
        this.currentItemY = -4;
        return;
      default:
      return;
    }
  }

  goRightIfPossible() {
    let canGoRight = true;
    for (let y = 0; y <= 3; y++) {
      for (let x = 0; x <= 3; x++) {
        if (this.currentItem[y][x] && x + this.currentItemX >= 9) {
          canGoRight = false;
        }
      }
    }
    if (canGoRight) {
      this.currentItemX++;
    }
  }

  goLeftIfPossible() {
    let canGoLeft = true;
    for (let y = 0; y <= 3; y++) {
      for (let x = 0; x <= 3; x++) {
        if (this.currentItem[y][x] && x + this.currentItemX <= 0) {
          canGoLeft = false;
        }
      }
    }
    if (canGoLeft) {
      this.currentItemX--;
    }
  }

  rotateCurrentItem() {
    const newItemRotation = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    for (let y = 0; y <= 3; y++) {
      for (let x = 0; x <= 3; x++) {
        newItemRotation[x][3 - y] = this.currentItem[y][x];
      }
    }
    this.currentItem = newItemRotation;
  }

  onKeyDown(event) {
    if (event.keyCode === 39) { // right key
      this.goRightIfPossible();
    }
    else if (event.keyCode === 37) { // left key
      this.goLeftIfPossible();
    }
    else if (event.keyCode === 32) { // space key
      this.rotateCurrentItem();
    }
  }

  renderPixi(delta) {
    if (!this.pixiGraphics) {
      return;
    }

    const changes = handleAI(
      _.cloneDeep(this.cells),
      _.cloneDeep(this.currentItem),
      this.currentItemX,
      this.currentItemY);

    if (changes.goLeft) {
      this.goLeftIfPossible();
    } else if (changes.goRight) {
      this.goRightIfPossible();
    }

    if (changes.rotate) {
      this.rotateCurrentItem();
    }

    this.timeSinceLastMovement += delta;

    if (this.timeSinceLastMovement > 20) {
      this.currentItemY++;
      this.timeSinceLastMovement = 0;

      let isItemLanded = false;
      for (let y = 0; y <= 3; y++) {
        for (let x = 0; x <= 3; x++) {
          if (this.currentItem[y][x]) {
            const curY = this.currentItemY + y + 1;
            if (curY >= 0 && (curY > 19 || this.cells[curY][this.currentItemX + x])) {
              isItemLanded = true;
            }
          }
        }
      }

      if (isItemLanded) {
        for (let y = 0; y <= 3; y++) {
          const curY = this.currentItemY + y;
          for (let x = 0; x <= 3; x++) {
            const curX = this.currentItemX + x;
            if (curY < 0 && this.currentItem[y][x]) {
              this.hasLost = true;
            }
            if (curY >= 0 && curX >= 0 && curY <= 19 && curX <= 9) {
              this.cells[curY][curX] = this.cells[curY][curX] || this.currentItem[y][x];
            }
          }
        }

        this.getNewItem();
      }

      if (this.hasLost) {
        this.resetGame();
        this.hasLost = false;
      } else {
        for (let y = 19; y >= 0; y--) {
          let isRowFilled = true;
          for (let x = 0; x <= 9; x++) {
            if (!this.cells[y][x]) {
              isRowFilled = false;
            }
          }
          if (isRowFilled) {
            for (let i = y; i >= 1; i--) {
              this.cells[i] = this.cells[i-1];
            }
            this.cells[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
        }
      }
    }

    this.pixiGraphics.clear();

    this.pixiGraphics.beginFill(0x666666);
    this.pixiGraphics.lineStyle(2, 0xcccccc);
    this.pixiGraphics.drawRect(150, 0, 300, 600);
    this.pixiGraphics.endFill();

    this.pixiGraphics.lineStyle(1, 0xcccccc);

    // let x = 4;
    // let y = 7;
    for (let y = 0; y <= 19; y++) {
      for (let x = 0; x <= 9; x++) {
        const color = colors[this.cells[y][x]];
        this.pixiGraphics.beginFill(color);
        this.pixiGraphics.drawRect(150 + 30 * x, 30 * y, 30, 30);
        this.pixiGraphics.endFill();
      }
    }

    for (let y = 0; y <= 3; y++) {
      for (let x = 0; x <= 3; x++) {
        if (this.currentItem[y][x] && this.currentItemY + y >= 0 && this.currentItemX + x >= 0) {
          const color = colors[this.currentItem[y][x]];
          this.pixiGraphics.beginFill(color);
          this.pixiGraphics.drawRect(
            150 + 30 * (this.currentItemX + x),
            30 * (this.currentItemY + y),
            30,
            30
          );
          this.pixiGraphics.endFill();
        }
      }
    }
  }

  updatePixiContainer = (element) => {
    if (!element) {
      return;
    }
    // the element is the DOM object that we will use as container to add pixi stage(canvas)
    this.pixiContainer = element;
    //now we are adding the application to the DOM element which we got from the Ref.
    if(this.pixiContainer && this.pixiContainer.children.length<=0) {
      this.pixiContainer.appendChild(this.pixiApp.view);
      //The setup function is a custom function that we created to add the sprites. We will this below
      this.initialize();
    }
  };
  
  initialize = () => {
    this.pixiApp.stage.sortableChildren = true;
    this.pixiGraphics = new PIXI.Graphics();
    this.tetrisContainer = new PIXI.Container();
    this.tetrisContainer.addChild(this.pixiGraphics);
    this.pixiApp.stage.addChild(this.tetrisContainer);

    this.pixiApp.ticker.add(this.renderPixi);
  }

  render() {
    return (
      <div className="App">
        <div
          className="pixiContainer"
          ref={this.updatePixiContainer}
        />
        <div
          className="editor"
        />
      </div>
    );
  }
}

export default App;