import React from 'react';
import Hotel from "./Hotel";
import Axios from "axios"
// props: name of the city 
class City extends React.Component {

constructor(props){
   super(props);
   this.state={hotelinthiscity:[]}
}
// TODO figure a way to combine the two databases together
   componentDidMount(){
   
      Axios.get(`/api/city/${this.props.name}`)
      .then(res=>{
         this.setState({hotelinthiscity:res.data})
         
         }
      )
      .catch(e=>console.log(e))
   }
    render(){
       
      return<> 
      <div id={this.props.name} style={{marginLeft:50}}>
        <h2>{this.props.name}</h2>
       <div id='wrapper' className="row">
      
         {this.state.hotelinthiscity.map((r,key)=> <Hotel key={key} 
         obj={r} 
         src={refineimgsrc(r.filepath) || "http://via.placeholder.com/640x360" }
         web={refineweb(r.website)}
         />)}
       </div>
       </div>
       </>
       }
    }


    export default City


    function refineimgsrc(string){
     let m= string.split("/").slice(1).join("/");
      return "/"+m;
    }
    function refineweb(string){
      if (string.substring(0,8) !== "https://" ){
         string= "https://"+ string;
      }    
      return string;
    }
   