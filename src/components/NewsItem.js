import React, { Component } from 'react'

export class NewsItem extends Component {

  // constructor(){
  //   super();
  //   console.log("I AM CONSTRUCTOR OF NEWS ITEM COMPONENT");
  // }


  render() {
 
    let {title,description,imageurl,newsurl,author,date,source}=this.props;

    return (
      <div>

{/* <div className="card" style={{width: "18rem"}}> */}
<div className="card" >
  <img src={!imageurl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtjg_w9adhihainB1QCPXV_D3iuJNdnd1SDg&usqp=CAU":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title.slice(0,45)}....</h5>
    <p className="card-text">{description.slice(0,60)}....</p>  
    <p className="my-2" style={{color:'grey'}} >By {author} on {new Date(date).toGMTString()}</p>
    <span style={{zIndex:"10",left:"85%"}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
    {source.name}
    <span className="visually-hidden">unread messages</span>
  </span>
    
    <a href={newsurl} target="_blank" className="btn btn-sm btn-dark my-2">Read More</a>
  </div>
</div>
             
 

      </div>
    )
  }
}

export default NewsItem

// import React from 'react';

// const NewsItem = ({ title, description, imageurl, newsUrl, author, date, source }) => {
//   return (
    

// <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//     <a href="#">
//         <img className="rounded-t-lg" src={!imageurl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtjg_w9adhihainB1QCPXV_D3iuJNdnd1SDg&usqp=CAU":imageurl} alt="" />
//     </a>
//     <div className="p-5">
//         <a href="#">
//             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
//         </a>
//         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
//         <button type="button"  href="#" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
//             Read more
          
//         </button>
//     </div>
// </div>

//   );
// };

// export default NewsItem;
