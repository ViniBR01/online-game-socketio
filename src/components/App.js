import React from 'react';
import Canvas from './Canvas';

class App extends React.Component {
    constructor() {
        super();
        this.onDown = this.onDown.bind(this);
        this.state = {
            x_p: {x: 1},
            y_p: {y: 2},
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
                this.setState ((state, props) => ({
                    y_p: {y: (state.y_p.y + 9) % 10},
                }));
                break;
            case 'ArrowDown':
                this.setState ((state, props) => ({
                    y_p: {y: (state.y_p.y + 11) % 10},
                }));
                break;
            case 'ArrowLeft':
                this.setState ((state, props) => ({
                    x_p: {x: (state.x_p.x + 9) % 10},
                }));
                break;
            case 'ArrowRight':
                this.setState ((state, props) => ({
                    x_p: {x: (state.x_p.x + 11) % 10},
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
