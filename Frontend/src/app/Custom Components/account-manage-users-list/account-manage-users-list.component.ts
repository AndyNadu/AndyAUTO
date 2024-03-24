import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserDTO } from '../../Data Transfer Objects (DTOs)/UserDTO';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';
import { LocationDTO } from '../../Data Transfer Objects (DTOs)/LocationDTO';

@Component({
  selector: 'app-account-manage-users-list',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './account-manage-users-list.component.html',
  styleUrl: './account-manage-users-list.component.css'
})
export class AccountManageUsersListComponent {
  users: UserDTO[] = [];
  locations: string[] = [];
  usersForms: FormGroup[] = [];
  changeRoleLoading: boolean = false;

  ng!: SelectItem;

  constructor(private _http: HttpClient,
            private _formBuilder: FormBuilder,
            library: FaIconLibrary) 
  {
    library.addIcons(faUser);
  }
  ngOnInit() {
    this._http.get<UserDTO[]>('http://localhost:5113/account/manage/get-users')
    .subscribe({
      next: (result: UserDTO[]) => {
        this.users = result;
        console.log(this.users[0].locationAddress);

        this.users.forEach(() => {
          const userForm = this._formBuilder.group({
            role: '',
            location: [{value: '', disabled: true}]
          });

          this.usersForms.push(userForm);
        });
      }
    })

    this._http.get<LocationDTO[]>('http://localhost:5113/account/manage/get-locations')
    .subscribe({
      next: (result: LocationDTO[]) => {
        result.forEach(location => {
          this.locations.push(location.address!);
        });
      }
    })

    this.usersForms.forEach ( form => {
      console.log('this');
      console.log(form.get('role')!.value == '');
    });

    // this.usersForms[0].get('role')?.valueChanges.subscribe((role) => {
    //   console.log('this');
      
    //   const locationControl = this.usersForms[0].get('location');
    //   if (role) {
    //     // Dacă există un rol selectat, activează câmpul "location"
    //     locationControl?.enable();
    //   } else {
    //     // Dacă nu există un rol selectat, dezactivează câmpul "location"
    //     locationControl?.disable();
    //   }
    // });
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
  onRoleSelected(index: number): void {
    this.users[index].role = this.users[index].role === 'User' ? 'Admin' : 'User';
  }
}