export { default as MyProfile } from './components/MyProfile';
export * from './actions';
import * as model from '../home/model';
export { model };
import reducer from './reducer';
export default reducer;
