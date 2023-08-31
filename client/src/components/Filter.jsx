// import React from 'react'

// const Filter = () => {


//     // const dropdown = async (e) => {
//     //     e.preventDefault();
//     //     try{
//     //         $('.dropdown-toggle').dropdown()
//     //     }
//     //     catch (err){
//     //         console.log(err);
//     //     }
//     // }

//     return (
//     <div className="dropdown mb-3">
//         <button className = "btn btn-secondary dropdown-toggle" type ="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//             Sort By
//         </button>
//         <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
//             <a className="dropdown-item" href="#">Dropdown link</a>
//             <a className="dropdown-item" href="#">Dropdown link</a>
//         </div>
//     </div>
//   )
// }

// export default Filter

import Dropdown from 'react-bootstrap/Dropdown';

function BasicExample() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary mb-3" id="dropdown-basic">
        Sort By
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;
