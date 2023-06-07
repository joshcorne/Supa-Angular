import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '@app/features/account/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  profileForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
    },
    { updateOn: 'blur' }
  );

  userId?: string; // Null if no user is logged in
  error?: string;
  saving = false;

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.profile$.subscribe((profile) => {
      if (profile) {
        // Make sure to set emitEvent to false to prevent infinite loop
        this.profileForm.patchValue(profile, { emitEvent: false });
        this.userId = profile.id;
      } else {
        this.profileForm.reset({}, { emitEvent: false });
        delete this.userId;
      }
    });

    this.profileForm.valueChanges.subscribe((value) => {
      if (this.profileForm.valid) {
        this.saving = true;
        delete this.error;
        this.profileService.updateProfile(this.userId!, value)
          .then((response) => {
            if (response.error) {
              this.error = response.error.message;
            }
            this.saving = false;
          });
      }
    });
  }
}
