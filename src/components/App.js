import React from 'react';
import Canvas from './Canvas';

class App extends React.Component {
    constructor() {
        super();
        this.notifyAll = this.notifyAll.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.checkForItemCollision = this.checkForItemCollision.bind(this);
        
        this.state = {
            players: {
                'player1': { x: 1, y: 1 },
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
            },
            playerId: 'player1',
            itemCount: 0,
            observers: [],
        };
    }

    //////////////////* Input Layer *//////////////////////////////////
    registerPlayerId(playerId) {
    }
    subscribe(observerFunction) {
        var observers = this.state.observers;
        observers.push(observerFunction);
        this.setState((state, props) => ({
            observers: observers,
        }));
    }
    notifyAll(command) {
        for (const observerFunction of this.state.observers) {
            observerFunction(command);
        }
    }
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
        this.subscribe(this.movePlayer); //This line is the integration
        this.start(); //this line starts the game
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }
    handleKeydown(event) {
        const keyPressed = event.key;
        const command = {
            cmdType: 'move-player',
            playerId: this.state.playerId,
            key: keyPressed,
        }
        this.notifyAll(command);
    }
    ///////////////////* End of Input Layer *//////////////////////////

    //////////////////* Game and Rules Layer */////////////////////////
    addPlayer(command) {
    }

    removePlayer(command) {
    }
    
    movePlayer(command) {
        const keyPressed = command.key;
        const playerId = command.playerId;
        var players = {...this.state.players};

        if (players[playerId]) {
            switch (keyPressed) {
                case 'ArrowUp':
                    players[playerId].y = (this.state.players[playerId].y + 9) % 10;
                    this.setState ((state, props) => ({
                        players: players,
                    }));
                    break;
                case 'ArrowDown':
                    players[playerId].y = (this.state.players[playerId].y + 11) % 10;
                    this.setState ((state, props) => ({
                        players: players,
                    }));
                    break;
                case 'ArrowLeft':
                    players[playerId].x = (this.state.players[playerId].x + 9) % 10;
                    this.setState ((state, props) => ({
                        players: players,
                    }));
                    break;
                case 'ArrowRight':
                    players[playerId].x = (this.state.players[playerId].x + 11) % 10;
                    this.setState ((state, props) => ({
                        players: players,
                    }));
                    break;
                default:
                    break;
            }
        }
        this.checkForItemCollision(playerId);
    }

    addItem(command) {
        //console.log("called addItem");
        const itemId = command ? command.itemId : Math.floor(Math.random() * 100000000);
        const itemX = command ? command.itemX : Math.floor(Math.random() * this.state.size.columns);
        const itemY = command ? command.itemY : Math.floor(Math.random() * this.state.size.rows);
        //console.log(itemX, itemY);
        
        var items = this.state.items;
        items[itemId] = {
            x: itemX,
            y: itemY,
        }
        this.setState({
            items: items,
        });
        //Fix-me: if the fruit appears on top of a player, it's not captured right away
    }

    removeItem(command) {
        const itemId = command.itemId;

        var items = this.state.items;
        delete items[itemId];
        this.setState({
            items: items,
        });
    }

    checkForItemCollision(playerId) {
        //console.log("Check for collision")
        const player = this.state.players[playerId];
        //console.log(player);
        for (const itemId in this.state.items) {
            const item = this.state.items[itemId];
            if (player.x === item.x && player.y === item.y) {
                this.removeItem({ itemId: itemId })
            }
        }
    }

    start() {
        //console.log("called start function");
        const frequency = 2000;
        //setInterval(this.addItem, frequency);
    }
    ///////////////////* End of Game Layer *//////////////////////////
    
    
    render() {    
        return (
            <div>
                <Canvas {...this.state} />
            </div>
        );
    }
}

export default App;
