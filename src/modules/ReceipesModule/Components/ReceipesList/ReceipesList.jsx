// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import receipesImg from '../../../../assets/Group receipes.png'
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import noData from "../../../../assets/no-data.png";
import food from "../../../../assets/food.jpg";
import DeleteItems from "../../../SharedModule/Components/DeleteItems/DeleteItems";


export default function ReceipesList() {

  const [receipesList, setReceipesList] = useState([])

  const [ReceipeId, setReceipeId] = useState("");
  
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
      setReceipeId(id);
      setShowDelete(true);
    }; 

  const getReceipes = async () => {
    try {
        let response = await axios.get(
          "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=5&pageNumber=1",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReceipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }


 let deleteReceipeItem = async () => {
   await axios.delete(
     `https://upskilling-egypt.com:3006/api/v1/Recipe/${ReceipeId}`,
     {
       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
     }
   );
   handleCloseDelete();
   getReceipes();
 };

  useEffect(() => {
  getReceipes();
  }, [])
  

  return (
    <>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="my-2 px-5 ">
          <DeleteItems itemName={"Item"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteReceipeItem}>
            Delete This Item
          </Button>
        </Modal.Footer>
      </Modal>

      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={receipesImg}
      />
      <div className="container-fluid ">
        <div className="row g-0 mx-1">
          <div className="col-md-6">
            <h4 className=" my-0 pt-1">Recipe Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div className="col-md-6 text-end pt-2">
            <button className="notfound-button rounded-3 text-white px-5 py-2 ">
              Add New Items
            </button>
          </div>
        </div>
      </div>

      {receipesList.length ? (
        <div className="categories-crud container-fluid">
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Description</th>
                <th>Tag</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {receipesList.map((ele, index) => (
                <tr key={ele.id}>
                  <td>{index + 1}</td>
                  <td>{ele.name}</td>
                  <td>
                    <img
                      src={ele.imagePath || food}
                      style={{ width: "100px" }}
                      alt=""
                    />
                  </td>
                  <td>{ele.price}</td>
                  <td>{ele.description}</td>
                  <td>{ele.tag.name}</td>
                  <td>{ele.tag.Category}</td>
                  <td>
                    <i className="fa fa-edit mx-2 text-warning"></i>
                    <i onClick={()=>handleShowDelete(ele.id)} className="fa fa-trash text-danger"></i>
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
