import React,{ Component } from 'react'
import {connect}            from 'react-redux';
import { BrowserRouter as Router,Route} from 'react-router-dom'
import ListIcons         from './components/list_icons/list_icons'
import Main_Left  from './components/main_left/main_left';
import Main_Right from './components/main_right/main_right';
import Tuitar     from './components/tuitar/tuitar';
import Perfil     from './components/perfil/perfil';
import {GetAllUser} from './service/service_user';
import { FaTwitter,
    FaHashtag,
    FaRegBell,
    FaRegEnvelope,
    FaRegBookmark,
    FaRegListAlt,
    FaRegUser,
    FaRegSun}       from "react-icons/fa";
import { RiHome7Line }   from "react-icons/ri";


import './css/main.css';

export class Home extends Component {

    componentWillMount() {
        //Pegando os dados da localStorage para ser inserida as infformações do usuário no redux
        const session = JSON.parse(localStorage.getItem('session'));
      this.setState({id:session.id})
        this.props.GetAllUser(session);
    }
    
    
    render() {
        console.log(this.state.id);
        return (
            <Router basename="/tweet_clone">
            <>
            
            <main>
                <div className="main-left">
                    <Main_Left/>
                </div>
                <div className="main-container">
                   
                        <Route exact path={this.props.router.home} component={Tuitar}/>
                        <Route path={`${this.props.router.perfil}/:id`} component={Perfil}/>
                    
                </div>
                <Main_Right/>
            </main>
            <div className="footer-menu">

            <ListIcons icones={[
                                {icon:<RiHome7Line/>,link:true,router:this.props.router.home},
                                {icon:<FaRegBell/>,class:"inativo",link:false},
                                {icon:<FaRegEnvelope/>,class:"inativo",link:false},
                                {icon:<FaRegUser/>,link:true,router:`${this.props.router.perfil}/${this.state.id}`}
                            ]}
                  />
            </div>
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

