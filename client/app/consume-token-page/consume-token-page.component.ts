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
  lastToken: Token = null;
  lastTokenSuccess: boolean = null;

  constructor(private route: ActivatedRoute, private consumeTokenService : ConsumeTokenService) { }

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(queryParams => {
        this.consumeToken(queryParams["token"]);
      }
    );
  }

  ngOnDestroy() {
    if (this.querySub)
      this.querySub.unsubscribe();
  }

  consumeToken(token: string) : void {
    this.consumeTokenService.consumeToken(token)
      .then(resolvedToken => {
        this.lastToken = resolvedToken;
        this.lastTokenSuccess = true;
      })
      .catch((error) => {
        this.lastToken = null;
        this.lastTokenSuccess = false;
      });
  }

}
