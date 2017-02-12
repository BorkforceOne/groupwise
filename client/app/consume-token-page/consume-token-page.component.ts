import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {ConsumeTokenService} from "../services/token/consume-token.service";
import {Token} from "../services/token/token";

@Component({
  selector: 'app-consume-token-page',
  templateUrl: './consume-token-page.component.html',
  styleUrls: ['./consume-token-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ConsumeTokenService]
})

export class ConsumeTokenPageComponent implements OnInit {
  querySub: Subscription = null;
  status: string = "PENDING";
  foundToken: Token = null;

  constructor(private route: ActivatedRoute, private consumeTokenService : ConsumeTokenService) { }

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(queryParams => {
        this.processToken(queryParams["token"]);
      }
    );
  }

  ngOnDestroy() {
    if (this.querySub)
      this.querySub.unsubscribe();
  }

  processToken(token) {
    this.consumeTokenService.getToken(token)
      .then((resolvedToken: Token) => {
        this.status = "FOUND_TOKEN";
        this.foundToken = resolvedToken;

        switch (this.foundToken.Type) {
          case 'REGISTRATION':
            this.consumeTokenService.consumeToken(this.foundToken);
            break;

          case "FORGOT_PASSWORD":

            break;
        }
      })
      .catch((error) => {
        this.foundToken = null;
        this.status = "FAIL";
      });
  }

  consumeToken(token: Token) : void {
    this.consumeTokenService.consumeToken(token)
      .then(resolvedToken => {
        this.status = "SUCCESS";
      })
      .catch((error) => {
        this.status = "FAIL";
      });
  }

}
