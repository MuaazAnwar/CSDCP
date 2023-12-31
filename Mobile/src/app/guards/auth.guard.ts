import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from 'src/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private dataService: DataService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // check userId from local storage to see if logged in
    const userId = this.dataService.getData('userId');

    if (!userId || userId <= 0) {
      this.router.navigate(['/login']); // Redirect to login page if not authenticated
      return false;
    }

    return true;
  }
}
