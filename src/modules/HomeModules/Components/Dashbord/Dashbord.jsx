// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from '../../../../assets/Group header.png'

export default function Dashbord() {
  return (
    <>
      <Header
        title={"Welcom Upskilling"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={headerImg}
      />
    </>
  );
}
