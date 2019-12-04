import React from "react";


function Modal(props){
    var name=props.name;
    var id=props.id;
    
   
    return(
        
        <div>
            <button type="button"  id={"btn"+name} className="btn btn-primary"
            data-toggle="modal" data-target={"#"+id}>
            review
            </button>
            
            <div className="modal fade" id={id} tabIndex="-1" >
            <div className="modal-dialog" >
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{name}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
                    </div>
                <div className="modal-body">
                <div className="row" >
                        <div className="col-md-10">Review</div>
                        <div className="col-md-2">Rating</div>
                        </div>
                    {props.rev.map((r ,key)=> 
                
                    <div className="row" key={key}>
                        <div className="col-md-10">{r.review}</div>
                        <div className="col-md-2">{r.rating}</div>
                    </div>
                    
                    
                    
                    )} 
                
                </div>
               
                </div>
            </div>
            </div>
            
            </div> 
        );
}
export default Modal;