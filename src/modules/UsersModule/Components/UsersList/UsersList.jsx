// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import UsersImg from "../../../../assets/Group receipes.png";
import { Button, Modal, Table } from "react-bootstrap";
import DeleteItems from "../../../SharedModule/Components/DeleteItems/DeleteItems";
import axios from "axios";
import noData from "../../../../assets/no-data.png";
import { toast } from "react-toastify";

export default function UsersList() {

  let [showDelete, setShowDelete] = useState(false)

  const [userId , setUserId] = useState('')

  let handleShowDelete = (id) => {
     setUserId(id);
    setShowDelete(true)
  }

  let handleCloseDelete = () => {
    setShowDelete(false)
  }

  let [usersList, setUsersList] = useState([])
  
  const getUsersList = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          // params: { name: name },
        }
        
      );
      setUsersList(response?.data.data);
      // console.log(usersList);
    } catch (error) {
      console.log(error);
    }
  }

  let deleteUser = async () => {
    try {
      let deletedUser = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success(deletedUser.data.message);
      setShowDelete(false);
      getUsersList();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
  getUsersList()
  }, [])

   return (
     <>
       <Header
         title={"Usere Items"}
         description={
           "You can now add your items that any user can order it from the Application and you can edit"
         }
         imgUrl={UsersImg}
       />
       <Modal show={showDelete} onHide={handleCloseDelete}>
         <Modal.Header closeButton></Modal.Header>
         <Modal.Body className="my-2 px-5 ">
           <DeleteItems itemName={"Category"} />
         </Modal.Body>
         <Modal.Footer>
           <Button variant="danger" onClick={deleteUser}>
             Delete This Item
           </Button>
         </Modal.Footer>
       </Modal>
       {usersList.length ? (
         <div className="categories-crud container-fluid">
           <Table striped bordered hover className="text-center">
             <thead>
               <tr>
                 <th>#</th>
                 <th>Id</th>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Country</th>
                 <th>Group</th>
                 <th>Actions</th>
               </tr>
             </thead>
             <tbody>
               {usersList.map((ele, index) => (
                 <tr key={ele.id}>
                   <td>{index + 1}</td>
                   <td>{ele.id}</td>
                   <td>{ele.userName}</td>
                   <td>{ele.email}</td>
                   <td>{ele.country}</td>
                   <td>{ele.group.name}</td>
                   <td>
                     <i
                       onClick={() => handleShowDelete(ele.id)}
                       className="fa fa-trash text-danger"
                     ></i>
                   </td>
                 </tr>
               ))}
             </tbody>
           </Table>
         </div>
       ) : (
         <div className="categories-noData text-center w-50 mx-auto">
           <img src={noData} alt="" />
           <h4 className="my-3">No Data !</h4>
           <p className=" text-muted px-5 ">
             are you sure you want to add new items ? if you are sure just click
             on add new category .
           </p>
         </div>
       )}
     </>
   );
}
