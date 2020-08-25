import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { iniciarSesion, cerrarSesion } from '../actions/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnInit, OnDestroy  {

	private flagLogin: Observable<number>;
   
  private loginSubscription:Subscription;

  constructor(private store: Store<{ loginReducer: number }>, private router:Router) {
    this.flagLogin = store.pipe(select('loginReducer'));

    this.loginSubscription = this.flagLogin.subscribe(data=>{
      console.log(data);
      if(data){
        this.router.navigate(["home"]);        
      }
    });
  }

  ngOnInit() {

  }

  public iniciarSesion():void {
    this.store.dispatch(iniciarSesion());
  }

  ngOnDestroy(){
    console.log("destruir login");
    this.loginSubscription.unsubscribe();
  }

}