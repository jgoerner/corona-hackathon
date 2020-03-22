import {Injectable} from '@angular/core';
import {AccountEndpoint} from './apina-api';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable()
export class AuthService {

  private sessionActive$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private accountEndpoint: AccountEndpoint,
              private http: HttpClient,
              private router: Router) {
    this.reCheckIfSessionActive();
  }

  get sessionActive(): ReplaySubject<boolean> {
    return this.sessionActive$;
  }

  setSessionActive(value: boolean) {
    this.sessionActive$.next(value);
  }

  reCheckIfSessionActive() {
    this.accountEndpoint.session()
      .subscribe((result) => {
        this.sessionActive$.next(result);
      }, (err) => {
        this.sessionActive$.next(false);
      });
  }

  logout(queryParams: any = {}): void {
    this.http.post("/api/v1/logout", {})
      .subscribe((res) => {
        this.reCheckIfSessionActive();
        if (queryParams['route']) {
          this.router.navigate(['/login'], {queryParams});
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.sessionActive;
  }

}
