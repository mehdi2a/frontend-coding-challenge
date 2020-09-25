import { Component, OnInit, Input } from '@angular/core';
import { Repository } from 'src/app/shared/models/repository';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  @Input()  repository: Repository;
  constructor() { }

  ngOnInit(): void {
  }

  calculateDayLeft() {
    return Math.floor((new Date().valueOf() - this.repository.created_at.valueOf()) / (1000 * 3600 * 24));
  }
}
