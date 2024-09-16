
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import CategoriesImg from "../../../../assets/Group receipes.png";
import noData from "../../../../assets/no-data.png";
import { Table, Modal, Button, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import DeleteItems from "../../../SharedModule/Components/DeleteItems/DeleteItems";

export default function CategoriesList() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const [catId, setCatId] = useState('');
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setMode("add");
    setShow(true);
    setValue("name", "");
  };

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (id, name) => {
    setCatId(id);
    setMode("update");
    setShowUpdate(true);
    setValue("name", name);
  };

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setCatId(id);
    setShowDelete(true);
  };

  let [categoriesList, setCategoriesList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);

  const getCategories = async (name) => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { name: name, pageSize: pageSize, pageNumber: pageNumber }
        }
      );
      setCategoriesList(response.data.data);
      console.log(response.data);     
      setTotalCategories(response.data.totalNumberOfRecords);
    } catch (error) {
      console.log(error);
    }
  }

  if (mode === 'add') {
    var addCategories = async (data) => {
      try {
        let addedCategory = await axios.post(
          "https://upskilling-egypt.com:3006/api/v1/Category",
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Item Added Successfully", {
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: false,
        });
        handleClose();
        getCategories();
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    var updateCategories = async (data) => {
      try {
        let updatedCategory = await axios.put(
          `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Item Updated Successfully", {
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: false,
        });
        handleCloseUpdate();
        getCategories();
      } catch (error) {
        console.log(error);
      }
    };
  }

  const deleteCategoryItem = async () => {
    try {
      let deletedItem = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
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
      getCategories();
    } catch (error) {
      console.log(error);
    }
  }

  const getNameValue = (e) => {
    getCategories(e.target.value);
  }

  useEffect(() => {
    getCategories();
  }, [pageSize, pageNumber]);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setPageNumber(1);
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const renderPaginationItems = () => {
    const totalPages = Math.ceil(totalCategories / pageSize);
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === pageNumber} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <>
      <div className="modal">
        <Modal
          show={mode === "add" ? show : showUpdate}
          onHide={mode === "add" ? handleClose : handleCloseUpdate}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {mode === "add" ? "Add Category" : "Update Category"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="my-4 px-5 ">
            <form
              onSubmit={
                mode === "add"
                  ? handleSubmit(addCategories)
                  : handleSubmit(updateCategories)
              }
              className="d-flex flex-column align-items-end"
            >
              <input
                type="text"
                placeholder="Category Name"
                defaultValue={""}
                className="form-control my-3 bg-body-tertiary "
                {...register("name", { required: "Category Name Is Required" })}
              />
              {errors.name && (
                <p className="alert alert-danger w-100">
                  {errors.name.message}
                </p>
              )}
              <button className="notfound-button text-white rounded-2 px-4 py-1 mt-3  fw-semibold ">
                {mode === "add" ? "save" : "submit"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="my-2 px-5 ">
          <DeleteItems itemName={"Category"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteCategoryItem}>
            Delete This Item
          </Button>
        </Modal.Footer>
      </Modal>

      <Header
        title={"Categories Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={CategoriesImg}
      />
      <div className="container-fluid ">
        <div className="row g-0 mx-1">
          <div className="col-md-6">
            <h4 className=" my-0 pt-1">Categories Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div className="col-md-6 text-end pt-2">
            <button
              onClick={handleShow}
              className="notfound-button rounded-3 text-white ps-5 pe-4 py-2 "
            >
              Add New Category
            </button>
          </div>
        </div>
      </div>

      <div className="container ">
        <input
          onChange={getNameValue}
          placeholder="Search . ."
          type="search"
          className="form-control w-50 mx-auto my-3"
        />
      </div>
      {categoriesList.length ? (
        <div className="categories-crud container-fluid">
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>CreationDate</th>
                <th>ModificationDate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((ele , index) => (
                <tr key={ele.id}>
                  <td>{(pageNumber - 1) * pageSize + index + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.creationDate}</td>
                  <td>{ele.modificationDate}</td>
                  <td>
                    <i
                      onClick={() => handleShowUpdate(ele.id, ele.name)}
                      className="fa fa-edit mx-2 text-warning"
                    ></i>
                    <i
                      onClick={() => handleShowDelete(ele.id)}
                      className="fa fa-trash text-danger"
                    ></i>
                  </td>
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
                </select>
                Categories
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
