import React,{ Component } from 'react'
import {connect}            from 'react-redux';
import { BrowserRouter as Router,Route} from 'react-router-dom'
import Main_Left  from './components/main_left/main_left';
import Main_Right from './components/main_right/main_right';
import Tuitar     from './components/tuitar/tuitar';
import Perfil     from './components/perfil/perfil';
import {GetAllUser} from './service/service_user';


import './css/main.css';

export class Home extends Component {

    componentWillMount() {

        const session = JSON.parse(localStorage.getItem('session'));
        
        this.props.GetAllUser(session);
    }
    
    
    render() {
        return (
            <Router basename="/tweet_clone">
            <>
            
            <main>
                <div className="main-left">
                    <Main_Left/>
                </div>
                <div className="main-container">
                   
                        <Route exact path={this.props.router.home} component={Tuitar}/>
                        <Route  path={this.props.router.perfil} component={Perfil}/>
                    
                </div>
                <Main_Right/>
            </main>
           
            </>
             </Router>
        )
    }
}

function mapStateToProps(state){
   
    return {
           router : state.router_twitter, 
        sesion : state.post_twitter.fetch_all_post, 
           
        }
}

export default connect(mapStateToProps,{GetAllUser})(Home); 

