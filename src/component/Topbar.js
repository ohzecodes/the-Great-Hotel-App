import React from 'react';
function Topbar(prop){
return <a href={prop.url}>

<div class="alert alert-info alert-dismissible" role="alert">
  <button  class="close" data-dismiss="alert" type="button">×</button>
{prop.txt}
<span style={{color: "#0079fa", textDecoration: "underline"}} >Click here to learn more</span>

</div>
</a>

}

export default Topbar
