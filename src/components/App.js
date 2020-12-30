import React from 'react';
import Canvas from './Canvas';

class App extends React.Component {
    constructor() {
        super();
        this.onDown = this.onDown.bind(this);
        this.state = {
            player: {
                x: 1,
                y: 1,
            },
            x_i: {x: 4},
            y_i: {y: 4},
            size: {
                width: 400,
                height: 400,
                /* Assumes a 10x10 grid */
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
                var player = {...this.state.player};
                player.y = (this.state.player.y + 9) % 10;
                this.setState ((state, props) => ({
                    player: player,
                }));
                break;
            case 'ArrowDown':
                var player = {...this.state.player};
                player.y = (this.state.player.y + 11) % 10;
                this.setState ((state, props) => ({
                    player: player,
                }));
                break;
            case 'ArrowLeft':
                var player = {...this.state.player};
                player.x = (this.state.player.x + 9) % 10;
                this.setState ((state, props) => ({
                    player: player,
                }));
                break;
            case 'ArrowRight':
                var player = {...this.state.player};
                player.x = (this.state.player.x + 11) % 10;
                this.setState ((state, props) => ({
                    player: player,
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
