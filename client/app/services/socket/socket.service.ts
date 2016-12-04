import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as io from "socket.io-client";

@Injectable()
export class SocketService {
  private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect(this.host);
    this.socket.on("connect", () => this.connect());
    this.socket.on("disconnect", () => this.disconnect());
    this.socket.on("error", (error: string) => {
      console.log(`ERROR: "${error}" (${this.host})`);
    });
  }

  public emit(action, payload) {
    this.socket.emit(action, payload);
  }

  public subscribe(action) {
    return new Observable(observer => {
      let callbackCollector = (data) => {
        observer.next(data);
      };

      this.socket.on(action, callbackCollector);

      return () => {
        this.socket.removeListener(action, callbackCollector);
      };
    });
  }

  // Handle connection opening
  private connect() {
    console.log(`Connected to "${this.host}"`);
  }

  // Handle connection closing
  private disconnect() {
    console.log(`Disconnected from "${this.host}"`);
  }

}
