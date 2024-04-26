// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import UsersImg from "../../../../assets/Group receipes.png";

export default function UsersList() {
   return (
     <>
       <Header
         title={"Usere Items"}
         description={
           "You can now add your items that any user can order it from the Application and you can edit"
         }
         imgUrl={UsersImg}
       />
     </>
   );
}
