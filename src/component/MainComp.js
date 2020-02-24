import React from 'react'       ;
import Header from './header'   ;
import Body from './Body'       ;
import Topbar from './Topbar'

let n="The website uses heroku for its deployment where the filesystem is ephemeral. " 

class MainComp extends React.Component {

    render(){
       return<> 
       <Topbar txt={n} url="https://help.heroku.com/K1PPS2WM/why-are-my-file-uploads-missing-deleted" />
       <Header />
       <Body /> 
       
        </>
    }
}
export default MainComp








