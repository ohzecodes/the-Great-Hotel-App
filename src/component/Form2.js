import React from "react";
import Radiobutton from "./Radiobutton"
class Form2 extends React.Component {
  render() {
    let ar5=[1,2,3,4,5];

    return <form className="formqwe" onSubmit={this.props.submitform} 
    // style={} 
    >
        <div className="form-group row"></div>
        <label  className="col-sm-12 forml">
          Rate Your Stay
        </label>
        <div />

        {/* TODO get the id of this hotel */}
        <div className="form-group row" >
        <label className="col-sm-3 col-form-label" htmlFor="hotelSelect">Select your Hotel</label>
            <select id="hotelSelect" className="form-control col-sm-9 ">
            {this.props.Hotelnames.map((e, key) => (
                <option key={key}>{e}</option>
            ))}
            </select>
        </div>
        <div className="form-group row" >
        <label className="col-sm-3 col-form-label" htmlFor="rateme">Rate your stay</label>
        
       { ar5.map((e)=>
       <Radiobutton key={e} id={e} name="rateme" />)}
         
        </div>
        <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="Textarea">Comments </label>
           <div className="col-sm-9">
            <textarea className="form-control " id="Textarea" rows="3"></textarea>
          <span className="help-block">MAX:200 charecters</span>
        </div>  </div>
        <button type="submit"  className="btn btn-primary col-sm-12 form-control">
          Submit
        </button>
      </form>
    
  }
}

export default Form2;
