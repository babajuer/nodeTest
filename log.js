const EventEmitter = require('events');

class Logger extends EventEmitter {
    
    log(mess) {
        console.log(`111`, mess);
        this.emit('messageLoged', {id:'ID', text:'this is a test'});

    }

}

module.exports = Logger;