import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'src/app/shared/models/repository';
import { environment } from 'src/environments/environment';

interface Response {
  incomplete_results: boolean;
  items: Repository[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
  constructor(private http: HttpClient) { }

  getRecentRepositories(page: number, created_at: string): Observable<Repository[]> {
    return this.http.get(environment.API_URL + '?q=created:' + created_at + '&sort=stars&order=desc&page=' + page)
      .pipe(
        map((res: Response) => 
        res.items.map(
          ({
            name,
            stargazers_count,
            open_issues,
            description,
            html_url,
            created_at,
            owner
          }) => ({
            name,
            stargazers_count,
            open_issues,
            description,
            html_url,
            created_at: new Date(created_at),
            owner: {
              avatar_url: owner.avatar_url,
              login: owner.login,
              html_url: owner.html_url
            }
          })
        )
        )
      )
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
