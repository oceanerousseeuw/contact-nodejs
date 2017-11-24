const { setWorldConstructor } = require('cucumber');
const Zombie = require('zombie');

class CustomWorld {
    constructor(){
        this.browser = new Zombie({site: 'http://localhost:3000'});
    }
}

setWorldConstructor(CustomWorld);