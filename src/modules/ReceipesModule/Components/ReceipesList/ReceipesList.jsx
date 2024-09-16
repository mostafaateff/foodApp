
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import receipesImg from "../../../../assets/Group receipes.png";
import axios from "axios";
import { Button, Modal, Table, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import noData from "../../../../assets/no-data.png";
import food from "../../../../assets/food.jpg";
import DeleteItems from "../../../SharedModule/Components/DeleteItems/DeleteItems";
import { useNavigate } from "react-router-dom";

export default function ReceipesList({ loginData }) {
  let navigate = useNavigate();

  const [receipesList, setReceipesList] = useState([]);
  const [receipeDescription, setReceipeDescription] = useState([]);
  const [ReceipeId, setReceipeId] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setReceipeId(id);
    setShowDelete(true);
  };

  const [showDetails, setShowDetails] = useState(false);
  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = (id) => {
    getReceipeById(id);
    setShowDetails(true);
  };

  let [recipeName, setRecipeName] = useState(null);
  let [recipeTag, setRecipeTag] = useState(null);
  let [recipeCategory, setRecipeCategory] = useState(null);

  let [tagsId, setTagsId] = useState([]);
  const getTagsId = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      setTagsId(response.data);
      console.log(tagsId);
    } catch (error) {
      console.log(error);
    }
  };

  let [categoriesList, setCategoriesList] = useState([]);
  const getCategories = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalReceipes, setTotalReceipes] = useState(0);

  const getReceipes = async (name, tagId, categoryId) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            name,
            tagId,
            categoryId,
          },
        }
      );
      setReceipesList(response.data.data);
      setTotalReceipes(response.data.totalNumberOfRecords); 
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReceipeItem = async () => {
    await axios.delete(
      `https://upskilling-egypt.com:3006/api/v1/Recipe/${ReceipeId}`,
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
    getReceipes(recipeName, recipeTag, recipeCategory);
  };

  const addRecipe = () => {
    navigate("/dashboard/recipeData");
  };

  const getNameValue = (e) => {
    setRecipeName(e.target.value);
    getReceipes(e.target.value, recipeTag, recipeCategory);
  };

  const getTagValue = (e) => {
    setRecipeTag(e.target.value);
    getReceipes(recipeName, e.target.value, recipeCategory);
  };

  const getCategoryValue = (e) => {
    setRecipeCategory(e.target.value);
    getReceipes(recipeName, recipeTag, e.target.value);
  };

  const getReceipeById = async (id) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setReceipeDescription(response.data);
      console.log(receipeDescription);
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorites = async (recipeId) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/userRecipe/",
        { recipeId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setShowDetails(false);
      toast.success("Item Added To Favorites Successfully", {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReceipes("", "", "");
    getTagsId();
    getCategories();
  }, [pageNumber, pageSize]);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    setPageNumber(1); 
  };

  const renderPaginationItems = () => {
    const totalPages = Math.ceil(totalReceipes / pageSize);
    const maxPagesToShow = 5;
    const items = [];

    if (totalPages <= maxPagesToShow) {
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === pageNumber}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    } else {
      if (pageNumber > 3) {
        items.push(
          <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
            1
          </Pagination.Item>,
          <Pagination.Ellipsis key="start-ellipsis" />
        );
      }

      const startPage = Math.max(pageNumber - 2, 1);
      const endPage = Math.min(pageNumber + 2, totalPages);

      for (let number = startPage; number <= endPage; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === pageNumber}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }

      if (pageNumber < totalPages - 2) {
        items.push(
          <Pagination.Ellipsis key="end-ellipsis" />,
          <Pagination.Item
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    }

    return items;
  };

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

      <Modal show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton className="fw-bold">
          Recipe Details
        </Modal.Header>
        <Modal.Body className="my-2 text-center">
          <div className="text-center">
            <img
              src={
                receipeDescription.imagePath
                  ? "https://upskilling-egypt.com:3006/" +
                    receipeDescription.imagePath
                  : food
              }
              className="w-50 "
              alt=""
            />
          </div>
          <h4 className="text-black my-3">Name : {receipeDescription.name}</h4>
          <h4 className="text-black my-3">
            Price : {receipeDescription.price}
          </h4>
          <h4 className="text-black my-3">
            Tag : {receipeDescription.tag?.name}
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => addToFavorites(receipeDescription.id)}
          >
            Add To Favorites
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

      {loginData?.userGroup === "SystemUser" ? (
        ""
      ) : (
        <div className="container-fluid ">
          <div className="row g-0 mx-1">
            <div className="col-md-6">
              <h4 className=" my-0 pt-1">Recipe Table Details</h4>
              <p>You can check all details</p>
            </div>
            <div className="col-md-6 text-end pt-2">
              <button
                onClick={addRecipe}
                className="notfound-button rounded-3 text-white px-5 py-2 "
              >
                Add New Items
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="recipes-filteration contaier m-3">
        <div className="row  ">
          <div className="col-md-9">
            <div className="row g-2">
              <div className="col-md-9">
                <input
                  type="search"
                  onChange={getNameValue}
                  placeholder="Search here .."
                  className="form-control"
                />
              </div>
              <div className="col-md-2">
                <div className="input-group ">
                  <select className="form-select " onChange={getTagValue}>
                    <option value="">Tag</option>
                    {tagsId.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2 text-start ">
            <div className="input-group">
              <select className="form-select" onChange={getCategoryValue}>
                <option value="">Category</option>
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
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
              {receipesList.map((ele , index) => (
                <tr key={ele.id}>
                  <td>{(pageNumber - 1) * pageSize + index + 1}</td>
                  <td>{ele.name}</td>
                  <td>
                    <img
                      src={
                        ele.imagePath
                          ? "https://upskilling-egypt.com:3006/" + ele.imagePath
                          : food
                      }
                      style={{ width: "100px" }}
                      alt=""
                    />
                  </td>
                  <td>{ele.price}</td>
                  <td>{ele.description}</td>
                  <td>{ele.tag.name}</td>
                  <td>{ele.category[0]?.name}</td>
                  {loginData?.userGroup === "SystemUser" ? (
                    <td>
                      <i
                        onClick={() => addToFavorites(ele.id)}
                        className="fa fa-heart mx-2 text-danger"
                      ></i>
                      <i
                        onClick={() => handleShowDetails(ele.id)}
                        className="fa fa-eye text-warning"
                      ></i>
                    </td>
                  ) : (
                    <td>
                      <i className="fa fa-edit mx-2 text-warning"></i>
                      <i
                        onClick={() => handleShowDelete(ele.id)}
                        className="fa fa-trash text-danger"
                      ></i>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center">
            <Pagination>{renderPaginationItems()}</Pagination>
            <div>
              <label className=" fw-semibold mb-2">
                Show
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="mx-2"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
                Receipes
              </label>
            </div>
          </div>
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

