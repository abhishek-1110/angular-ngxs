import { State, Action, StateContext } from '@ngxs/store';
import { SetUser } from './user.action';

SetUser
export interface UserStateModel {
  name: string;
  email: string;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    name: '',
    email: ''
  }
})
export class UserState {
  @Action(SetUser)
  setUser(ctx: StateContext<UserStateModel>, action: SetUser) {
    debugger;
    ctx.setState({
      name: action.name,
      email: action.email
    });
  }
}
