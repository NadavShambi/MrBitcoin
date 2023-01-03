import { Component, Input } from '@angular/core';
import { Transfer } from 'src/app/models/transfer';

@Component({
  selector: 'move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss'],
})
export class MoveComponent {
  @Input() move: Transfer;
}
