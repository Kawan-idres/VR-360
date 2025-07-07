import { Fragment,useCallback } from "react";
import React from "react";
import ReactDom from "react-dom";
import ImageSlider from "./ImageSlider";
import { SliderData } from "./SliderImageData";

const Modal = ({ setModal }) => {

  console.log("modal");
  return ReactDom.createPortal(
    <Fragment>
      <div onClick={() => setModal(false)} className="modal">
        {" "}
      </div>
      <div className="modal-center">
        <div className="modal-content">
          <div className="infos">
            <h1 className="modal-h1">Info</h1>
            <p className="modal-p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              praesentium numquam nobis sequi tenetur facere obcaecati, sunt
              eos, cumque autem expedita rerum illum iure libero suscipit
             
            </p>
          </div>
          <ImageSlider slides={SliderData} />;
        </div>
      </div>
    </Fragment>,
    document.getElementById("modal")
  );
};

export default React.memo(Modal);
