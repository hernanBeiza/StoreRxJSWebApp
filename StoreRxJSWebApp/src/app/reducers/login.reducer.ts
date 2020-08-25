import { createReducer, on } from '@ngrx/store';
import { iniciarSesion, cerrarSesion } from './../actions/login.actions';
 
export const initialState:boolean = false;
 
const _loginReducer = createReducer(initialState,
  on(iniciarSesion, state => true),
  on(cerrarSesion, state => false)
);
 
export function loginReducer(state, action) {
	console.log(state,action);
	if(!state){
		console.warn("Obtener datos del localStorage");
		state = localStorage.getItem("login");
	}
	console.log(state);
	localStorage.setItem("login",state);
  return _loginReducer(state, action);
}