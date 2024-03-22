import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserDTO } from '../../Data Transfer Objects (DTOs)/UserDTO';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-account-manage-users-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './account-manage-users-list.component.html',
  styleUrl: './account-manage-users-list.component.css'
})
export class AccountManageUsersListComponent {
  users: UserDTO[] = [];
  changeRoleLoading: boolean = false;

  constructor(private _http: HttpClient,
              library: FaIconLibrary) {
    library.addIcons(faUser);
  }

  ngOnInit() {
    this._http.get<UserDTO[]>('http://localhost:5113/account/manage/get-users')
    .subscribe({
      next: (result: UserDTO[]) => {
        this.users = result;
      }
    })
  }
  changeRole(userId: string, userRole: string): void {
    this.changeRoleLoading = true;

    const userDTO: UserDTO = {
      id: userId,
      role: userRole
    }

    this._http.put<UserDTO>('http://localhost:5113/account/manage/user-change-role', userDTO)
    .subscribe({
    })
  }
}
