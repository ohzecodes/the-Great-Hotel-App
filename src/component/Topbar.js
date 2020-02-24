import React from 'react';
function Topbar(prop){
return <a href={prop.url}>

<div className="alert alert-info alert-dismissible" >
<button className="close" >x</button>
{prop.txt} 
<span style={{color: "#0079fa", textDecoration: "underline"}} >Click here to learn more</span>

</div>
</a>

}

export default Topbar