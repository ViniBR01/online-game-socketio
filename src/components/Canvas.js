import React from 'react';

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.drawGame = this.drawGame.bind(this);
    }

    componentDidMount() {
        this.drawGame();
    }
    componentDidUpdate() {
        this.drawGame();
    }

    drawGame() {
        //console.log(this.props);
        
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');

        /* Use clean start */
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        /* Render all players */
        context.fillStyle = 'black';
        for (const playerId in this.props.players) {
            context.fillRect(
                context.canvas.width/10 * this.props.players[playerId].x,
                context.canvas.height/10 * this.props.players[playerId].y,
                context.canvas.width/10,
                context.canvas.height/10,
            );
        }
        

        

        /* Render all items */
        context.fillStyle = 'green';
        for (const itemId in this.props.items) {
            context.fillRect(
                context.canvas.width/10 * this.props.items[itemId].x,
                context.canvas.height/10 * this.props.items[itemId].y,
                context.canvas.width/10,
                context.canvas.height/10,
            );
        }
        
    }

    render() {
        return (
            <div>
                <canvas ref={this.canvasRef} id="screen" width={this.props.size.width} height={this.props.size.height}>
                </canvas>
                
                <h1>Player position: ({this.props.players['player1'].x}, {this.props.players['player1'].y})</h1>
                <h4>use keyboard arrows to move player</h4>
            </div>
                );
    }
}

export default Canvas;
