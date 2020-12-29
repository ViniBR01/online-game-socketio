import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ========================================
class App extends React.Component {
    constructor() {
        super();
        this.canvasRef = React.createRef();
        this.state = {
            players: {
                'player1': { x: 0, y: 0 },
                'player2': { x: 5, y: 5 },
            },
            items: {
                'item1': {x: 3, y: 1 },
            },
        };
    }
    renderScreen() {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');

        /* Use clean start */
        context.fillStyle = 'white';
        context.fillRect(0, 0, 500, 500);

        /* Render all players */
        context.fillStyle = 'black';
        for (const playerId in this.state.players) {
            const player = this.state.players[playerId];
            context.fillRect(50*player.x, 50*player.y, 50, 50);
        }

        /* Render all items */
        context.fillStyle = 'green';
        for (const itemId in this.state.items) {
            const item = this.state.items[itemId];
            context.fillRect(50*item.x, 50*item.y, 50, 50);
        }
    }
    componentDidMount() {
        console.log("Canvas mounted");
        this.renderScreen();
    }
    render() {    
        return (
            <canvas ref={this.canvasRef} id="screen" width="500" height="500"></canvas>
        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
/* <Game /> instead of App will render the tic-tac-toe */
