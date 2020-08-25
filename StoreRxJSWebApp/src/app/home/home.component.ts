import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { iniciarSesion, cerrarSesion } from '../actions/login.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	private flagLogin: Observable<number>;
   
  private homeSubscription:Subscription;

  constructor(private store: Store<{ loginReducer: number }>, private router:Router) {
    this.flagLogin = store.pipe(select('loginReducer'));

    this.homeSubscription = this.flagLogin.subscribe(data=>{
      console.log(data);
      if(!data){
        this.router.navigate(["login"]);        
      }
    });
  }

  ngOnInit() {

  }
 
  public cerrarSesion():void {
    this.store.dispatch(cerrarSesion());
  }

  ngOnDestroy(){
    console.log("destruir home");
    this.homeSubscription.unsubscribe();
  }

}