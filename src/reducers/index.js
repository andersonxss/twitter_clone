import { combineReducers } from 'redux';
import post_twitter        from './post_twitter';
import user_twitter        from './user_twitter';
import router_twitter       from './router_twitter';

const rootReducer = combineReducers({
    post_twitter : post_twitter,
    user_twitter : user_twitter,
    router_twitter : router_twitter,
});

export default rootReducer;