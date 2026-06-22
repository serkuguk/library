import {Component, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {select, Store} from '@ngrx/store'
import { markFormGroupTouched, regexErrors } from 'src/app/shared/utils';

import * as fromAuth from '@pages/auth';
import * as fromLoginAction from '@pages/auth/store/user.actions';
import * as fromLoginSelectors from '@pages/auth/store/user.selectors';

import {Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {AuthTokenStorageService} from "@core/services/auth-token-storage.service";
import {FormFieldComponent} from "@shared/components/controls/form-field/form-field.component";
import {TranslateModule} from "@ngx-translate/core";
import {BasicInputComponent} from "@shared/components/controls/basic-input/basic-input.component";
import {PasswordInputComponent} from "@shared/components/controls/password-input/password-input.component";
import {ButtonComponent} from "@shared/components/button/button.component";

@Component({
  selector: 'app-login',
  providers: [AuthTokenStorageService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FormFieldComponent,
    BasicInputComponent,
    PasswordInputComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  public isInline: boolean = false;
  public regexErrors = regexErrors
  public loading$: Observable<boolean | null> | undefined;
  public loadingError$: Observable<string | null> | undefined;

  private readonly fb = inject(FormBuilder);
  private readonly store: Store<fromAuth.State> = inject(Store);

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromLoginSelectors.getLoading));
    this.store.dispatch(fromLoginAction.init());

    this.loginForm = this.fb.group({
        username: [null, {
            validators: [
              Validators.required,
              Validators.minLength(3),
              //passwordValidators,
              //passwordWithParamsValidators('secret')
            ]
        }],
        password: [null, {
          validators: [
            Validators.required,
            Validators.minLength(3),
            //passwordWithParamsValidators('secret')
          ]
        }]
    })
  }

  login(): void {
    if (!this.loginForm.valid) {
      this.loadingError$ = this.store.pipe(select(fromLoginSelectors.getLoadingError));
      markFormGroupTouched(this.loginForm);
      return;
    }

    this.store.dispatch(fromLoginAction.login(this.loginForm.value));

  }
}
