import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentUser } from '../../services/current-user.service';
import { Account } from '../../models/auth';
import { UpdateUserProfileRequest } from '../../models/user-requests';
import { MatSnackBar } from '@angular/material/snack-bar'; // Adjust the import path as needed

export interface PathUserProfile {
  firstName: string | null;
  lastName: string | null;
  photo: string | null;
  birthDate: Date | null;
}

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    standalone: false
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileImage: string | null = null;
  initialProfile: Account | undefined;

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 100, 0, 1);
  readonly maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private currentUser: CurrentUser,
    private readonly snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      birthDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initialProfile = this.currentUser.me;
    if (this.initialProfile) {
      this.profileForm.patchValue({
        firstName: this.initialProfile.firstName,
        lastName: this.initialProfile.lastName,
        email: this.initialProfile.email,
        birthDate: new Date(this.initialProfile.birthDate),
      });
      this.profileImage = this.initialProfile.photoUrl || null;
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updateRequest = this.profileForm.value as UpdateUserProfileRequest;

      this.currentUser.updateProfile(updateRequest).subscribe(() => {
        this.snackBar.open('Success!', 'Your profile was updated', {
          horizontalPosition: 'right',
          direction: 'ltr',
          verticalPosition: 'top',
          duration: 2000,
        });
      });

      this.profileForm.markAsPristine();
    }
  }
}
