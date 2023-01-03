import { Component, Input } from '@angular/core';

@Component({
  selector: 'cool-btn',
  templateUrl: './cool-btn.component.html',
  styleUrls: ['./cool-btn.component.scss'],
})
export class CoolBtnComponent {
  @Input() txt: string;
}
