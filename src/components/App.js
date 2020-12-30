import React from 'react';
import Canvas from './Canvas';

class App extends React.Component {
    constructor() {
        super();
        this.onDown = this.onDown.bind(this);
        this.state = {
            players: {
                'player1': { x: 1, y: 1 },
                'player2': { x: 3, y: 2 },
            },
            items: {
                'item1': { x: 4, y: 4 },
                'item2': { x: 6, y: 6 },
                
            },
            size: {
                width: 400,
                height: 400,
                rows: 10,
                columns: 10,
            }
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onDown);
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.onDown);
    }

    onDown(event) {
        switch (event.key) {
            case 'ArrowUp':
                var players = {...this.state.players};
                players['player1'].y = (this.state.players['player1'].y + 9) % 10;
                this.setState ((state, props) => ({
                    players: players,
                }));
                break;
            case 'ArrowDown':
                var players = {...this.state.players};
                players['player1'].y = (this.state.players['player1'].y + 11) % 10;
                this.setState ((state, props) => ({
                    players: players,
                }));
                break;
            case 'ArrowLeft':
                var players = {...this.state.players};
                players['player1'].x = (this.state.players['player1'].x + 9) % 10;
                this.setState ((state, props) => ({
                    players: players,
                }));
                break;
            case 'ArrowRight':
                var players = {...this.state.players};
                players['player1'].x = (this.state.players['player1'].x + 11) % 10;
                this.setState ((state, props) => ({
                    players: players,
                }));
                break;
            default:
                break;
        }
    };
    
    render() {    
        return (
            <div>
                <Canvas {...this.state} />
            </div>
        );
    }
}

export default App;
