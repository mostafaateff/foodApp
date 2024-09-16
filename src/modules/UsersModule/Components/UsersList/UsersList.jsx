
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import UsersImg from "../../../../assets/Group receipes.png";
import { Button, Modal, Table, Pagination } from "react-bootstrap";
import DeleteItems from "../../../SharedModule/Components/DeleteItems/DeleteItems";
import axios from "axios";
import noData from "../../../../assets/no-data.png";
import { toast } from "react-toastify";

export default function UsersList() {
  const [showDelete, setShowDelete] = useState(false);
  const [userId, setUserId] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const handleShowDelete = (id) => {
    setUserId(id);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const getUsersList = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsersList(response?.data.data);
      setTotalUsers(response?.data.totalNumberOfRecords); 
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
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
    getUsersList();
  }, [pageNumber, pageSize]);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    setPageNumber(1); 
  };

  const renderPaginationItems = () => {
    const totalPages = Math.ceil(totalUsers / pageSize);
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
      <Header
        title={"User Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={UsersImg}
      />
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="my-2 px-5 ">
          <DeleteItems itemName={"User"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteUser}>
            Delete This Item
          </Button>
        </Modal.Footer>
      </Modal>
      {usersList.length ? (
        <div className="users-crud container-fluid">
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
                  <td>{(pageNumber - 1) * pageSize + index + 1}</td>
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
          <div className="d-flex justify-content-between align-items-center">
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev
                onClick={() =>
                  handlePageChange(pageNumber > 1 ? pageNumber - 1 : 1)
                }
              />
              {renderPaginationItems()}
              <Pagination.Next
                onClick={() =>
                  handlePageChange(
                    pageNumber < Math.ceil(totalUsers / pageSize)
                      ? pageNumber + 1
                      : Math.ceil(totalUsers / pageSize)
                  )
                }
              />
              <Pagination.Last
                onClick={() =>
                  handlePageChange(Math.ceil(totalUsers / pageSize))
                }
              />
            </Pagination>
            <div >
              <label className="mx-2 mb-2 fw-semibold" htmlFor="pageSize">
                Page Size :{" "}
              </label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="users-noData text-center w-50 mx-auto">
          <img src={noData} alt="" />
          <h4 className="my-3">No Data!</h4>
          <p className="text-muted px-5">
            Are you sure you want to add new items? If you are sure, just click
            on add new category.
          </p>
        </div>
      )}
    </>
  );
}
