import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import CategoriesImg from "../../../../assets/Group receipes.png";
import food from "../../../../assets/food.jpg";
import noData from "../../../../assets/no-data.png";
import { Table, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteItems from "../../../SharedModule/Components/DeleteItems/DeleteItems";

export default function FavoritesList() {
 
  const [itemId, setItemId] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setItemId(id);
    setShowDelete(true);
  };

  let [favoritesList, setFavoritesList] = useState([]);

  const getFavorites = async (name) => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/userRecipe/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { name: name },
        }
      );
      console.log(response);
      console.log(response.data.data);
      setFavoritesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategoryItem = async () => {
    try {
      let deletedItem = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/${itemId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.warning("Item Deleted Successfully", {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      handleCloseDelete();
      getFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="my-2 px-5 ">
          <DeleteItems itemName={"From Favorites"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteCategoryItem}>
            Delete This Item
          </Button>
        </Modal.Footer>
      </Modal>

      <Header
        title={"Favorites Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={CategoriesImg}
      />

      {favoritesList.length ? (
        <div className="categories-crud container-fluid">
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {favoritesList.map((ele, index) => (
                <tr key={ele.id}>
                  <td>{index + 1}</td>
                  <td>{ele.recipe.name}</td>
                  <td>
                    <img
                      src={
                        ele.recipe.imagePath
                          ? "https://upskilling-egypt.com:3006/" +
                            ele.recipe.imagePath
                          : food
                      }
                      style={{ width: "100px" }}
                      alt=""
                    />
                  </td>
                  <td>{ele.recipe.category[0].name}</td>
                  <td>{ele.recipe.description}</td>
                  <td>{ele.recipe.price}</td>
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
