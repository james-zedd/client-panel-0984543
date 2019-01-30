import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

import { Client } from '../../models/Client';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(
    private flashmessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
    ) {

  }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    // console.log(value, valid);
    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if(!valid) {
      // Show error
      this.flashmessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add client
      this.clientService.newClient(value);
      // Show message
      this.flashmessage.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to dash
      this.router.navigate(['/']);
    }
  };

}
