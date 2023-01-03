import { Component, Input } from '@angular/core';
import { Transfer } from 'src/app/models/transfer';

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss'],
})
export class MovesListComponent {
  @Input() moves: Transfer[];
}
