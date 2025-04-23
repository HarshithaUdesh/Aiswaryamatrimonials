import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { register } from 'swiper/element/bundle';
register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  constructor(private remoteService : ServicesService) {

  }


  onMenuopen(event: any) {
  }
}
