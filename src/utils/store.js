import thunk              from 'redux-thunk';
import { createStore,compose,applyMiddleware} from 'redux';
import reducers       from '../reducers';

const store = createStore(reducers,compose(applyMiddleware(thunk)));

export  { store };