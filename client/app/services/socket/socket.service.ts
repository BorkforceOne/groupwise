import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as io from "socket.io-client";

@Injectable()
export class SocketService {
  private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
  socket: SocketIOClient.Socket;

  constructor() {
    this.connect();
  }

  public emit(action, payload) {
    if (this.socket != null)
      this.socket.emit(action, payload);
    else
      console.error("[SOCKET]", "Cannot send socket message because no active socket could be found");
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
  private onConnect() {
    console.log(`Connected to "${this.host}"`);
  }

  private connect() {
    this.socket = io.connect(this.host);
    this.socket.on("connect", () => this.onConnect());
    this.socket.on("disconnect", () => this.onDisconnect());
    this.socket.on("error", (error: string) => {
      console.log(`ERROR: "${error}" (${this.host})`);
    });
  }

  // Handle connection closing
  private onDisconnect() {
    this.socket = null;
    console.log(`Disconnected from "${this.host}"`);
    setTimeout(() => {
      // Attempt to reconnect
      this.connect();
    }, 1000);
  }

}
