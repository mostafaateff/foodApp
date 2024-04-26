// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Header({title , description , imgUrl}) {
    return (
      <>
          <div className="header-contaiiner rounded-3 m-3 text-white">
            <div className="container-fluid ">
              <div className="row justify-content-between align-items-center ">
                <div className="col-md-8">
                  <div className="content px-5 w-75">
                    <h2>{title}</h2>
                    <p>
                      {description}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="img">
                    <img src={imgUrl} className="w-75" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </>
    );
}
