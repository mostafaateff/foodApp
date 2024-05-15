// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from '../../../../assets/Group header.png'
import RecipeListHeader from "../../../SharedModule/Components/RecipeListHeader/RecipeListHeader";

export default function Dashbord({ loginData }) {

  console.log(loginData);

  return (
    <>
      <Header
        title={`Welcom ${loginData?.userName}`}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={headerImg}
      />
      <RecipeListHeader />
    </>
  );
}
