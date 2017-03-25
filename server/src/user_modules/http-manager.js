const http = require('http');
const express = require('./express-manager');
const config = require('../config');

class HttpManager {

  constructor() {
    this.context = null;
    this.port = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      // Get port from environment and store in Express.

      this.port = this._normalizePort(config.express.port);
      express.context.set('port', this.port);

      // Create HTTP server.
      this.context = http.createServer(express.context);

      // Bind to the port
      this.context.listen(this.port);

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

    let bind = typeof this.port === 'string'
      ? 'Pipe ' + this.port
      : 'Port ' + this.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`[HTTP] ${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`[HTTP] ${bind} is already in use`);
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
    console.log('[HTTP] Listening on ' + bind);
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
