import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../../api/axios";
import { Image } from "antd";

export default function Instagram() {
  //  const [intagram,setIntagram]=useState([])
  //  useEffect(()=>{
  //   instance
  //   .get("/intagram")
  //   .then((response)=>setIntagram(response.data))
  //   .catch((error)=>console.log(error))

  //  })
  return (
    <div>
      <>
        {/* //       <div className="instagram">
  //         <div className="container-fluid">
  //           <div className="row">
              
  //             {
  //               intagram.map((e,index)=>(
  //                 <div key={index} className="col-lg-2 col-md-4 col-sm-4 p-0">
  //               <div className="product__item">
  //                 <div
  //                   className="product__item__pic set-bg image-container "
  //                   data-setbg
  //                 >
  //                   <Image
  //                     className="product__item__pic set-bg image-container"
  //                     style={{ objectFit: "cover", borderRadius: "2px" }}
  //                     src={e.image}
  //                     alt="img"
  //                   />
  //                   <ul className="product__hover">
  //                     <li>
  //                       <Link to="#">
  //                         <span className="fa fa-instagram" />
  //                       </Link>
  //                     </li>
  //                   </ul>
  //                 </div>
  //               </div>
  //             </div>
  //               ))
  //             }
  //           </div>
  //         </div>
  //       </div> */}
      </>
    </div>
  );
}
