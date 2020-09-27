import { Component, OnInit, OnDestroy } from '@angular/core';
import { RepositoriesService } from 'src/app/core/services/repositories.service';
import { Repository } from 'src/app/shared/models/repository';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private month: string = this.getLastDate(30);
  private page = 1;
  public repositories: Repository[] = [];
  private firedOnce = false;
  public loading = true;
  private subscriptions: Subscription[] = [];

  constructor(private repositoriesService: RepositoriesService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  ngOnInit(): void {
    this.getRecentRepositories();
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  getLastDate(day: number): string {
    const date = new Date();
    date.setDate(date.getDate() - day);
    return date.toISOString().split('T')[0];
  }

  getRecentRepositories(): void {
    this.subscriptions.push(this.repositoriesService.getRecentRepositories(this.page, this.month).subscribe(res => {
      this.loading = false;
      this.repositories.push(...res);
    }));
  }

  scrollEvent = (event: any): void => {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && this.firedOnce === false){
        this.page++;
        this.getRecentRepositories();
        this.firedOnce = true;
     }else if ((window.innerHeight + window.scrollY) < document.body.offsetHeight && this.firedOnce === true ) {
      this.firedOnce = false;
      this.loading = true;
     }
  }
}
