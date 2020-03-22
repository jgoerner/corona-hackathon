import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated()
      .pipe(
        map((authenticated: boolean) => {
          if (authenticated) {
            this.router.navigateByUrl('/swag');
            return false;
          }
          return true;
        })
      );
  }
}
