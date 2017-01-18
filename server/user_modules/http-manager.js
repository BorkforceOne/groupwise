const http = require('http');
const express = require('./express-manager');
const debug = require('debug')('groupwise:server');

class HttpManager {

  constructor() {
    this.context = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      // Get port from environment and store in Express.

      const port = this._normalizePort(process.env.PORT || '4300');
      express.context.set('port', port);

      // Create HTTP server.
      this.context = http.createServer(express.context);

      // Bind to the port
      this.context.listen(port);

      // Add listeners
      this.context.on('error', this._onError.bind(this));
      this.context.on('listening', this._onListening.bind(this));

      resolve();
    });
  }

  /**
   * Event listener for HTTP server "error" event.
   */
  _onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    let bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  _onListening() {
    let addr = this.context.address();
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  /**
   * Normalize a port into a number, string, or false.
   */
  _normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }
}

module.exports = new HttpManager();
