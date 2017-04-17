import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../services/contact/contact.service";
import {AlertService} from "../services/alert/alert.service";
import {Alert} from "../services/alert/alert";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private contactForm: FormGroup;

  constructor(private contactService: ContactService, private formBuilder: FormBuilder, private alertService: AlertService) {

  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      From: ['', [<any>Validators.required, <any>Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")]],
      Message: ['', [<any>Validators.required]],
      Name: ['', [<any>Validators.required]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.createContact(this.contactForm.value)
        .subscribe(() => {
          this.contactForm.reset();
          let alert = new Alert();
          alert.Type = "success";
          alert.Text = "Message sent!";
          this.alertService.addAlert(alert);
        });
    }
  }

}
