import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs";
import * as io from "socket.io-client";

@Injectable()
export class SocketService {
  private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
  private timeout = null;
  public socket: BehaviorSubject<SocketIOClient.Socket> = new BehaviorSubject(null);

  constructor() {
    this.connect();
  }

  public emit(action, payload) {
    if (this.socket.getValue() != null)
      this.socket.getValue().emit(action, payload);
    else
      console.error("[SOCKET]", "Cannot send socket message because no active socket could be found");
  }

  public getSocket(): Observable<SocketIOClient.Socket> {
    return this.socket.asObservable();
  }

  public subscribe(socket, action) {
    return new Observable(observer => {
      let callbackCollector = (data) => {
        observer.next(data);
      };

      socket.on(action, callbackCollector);

      return () => {
        socket.removeListener(action, callbackCollector);
      };
    });
  }

  // Handle connection opening
  private onConnect() {
    console.log(`[SOCKET] Connected to "${this.host}"`);
  }

  private connect() {
    let socket = io.connect(this.host);
    socket.on("connect", this.onConnect.bind(this, socket));
    socket.on("disconnect", this.onDisconnect.bind(this, socket));
    socket.on("error", (error: string) => {
      console.log(`ERROR: "${error}" (${this.host})`);
    });
    this.socket.next(socket);
  }

  // Handle connection closing
  private onDisconnect(socket) {
    socket.disconnect();

    console.log(`[SOCKET] Disconnected from "${this.host}"`);
    if (this.timeout == null) {
      this.timeout = setTimeout(() => {
        // Attempt to reconnect

        console.log("[SOCKET] Attempting to reconnect socket...");
        if (this.socket.getValue().connected == false)
          this.connect();

        this.timeout = null;
      }, 1000);
    }
  }

}
