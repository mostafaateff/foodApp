import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RecipeListHeader from "../../../SharedModule/Components/RecipeListHeader/RecipeListHeader";

export default function RecipeData() {

    let navigate = useNavigate()

    let appendToFormData = (data) => {

        let recipeFormData = new FormData()
        recipeFormData.append("name",data.name);
        recipeFormData.append("description", data.description);
        recipeFormData.append("price", data.price);
        recipeFormData.append("tagId", data.tagId);
        recipeFormData.append("recipeImage", data.recipeImage[0]);
        recipeFormData.append("categoriesIds", data.categoriesIds);
        
        return recipeFormData
    }

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

    const onSubmit = async (data) => {
        let recipesData = appendToFormData(data)
       try {
         let response = await axios.post(
           "https://upskilling-egypt.com:3006/api/v1/Recipe",
           recipesData,
           {
             headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
           }
         );
        console.log(response);
        toast.success("Recipe Added successfully", {
           autoClose: 3000,
           hideProgressBar: true,
           pauseOnHover: false,
         });
         navigate("/dashboard/recipes");
       } catch (error) {
         toast.error(error.response.data.message, {
           autoClose: 3000,
           hideProgressBar: true,
           pauseOnHover: false,
         });
       }
  };

  useEffect(() => {
    getCategories();
    getTagsId();
  }, []);

  return (
    <>
      <RecipeListHeader />
      <div className="w-75 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group my-4 ">
            <input
              type="text"
              className="form-control bg-light"
              placeholder="Recipe Name"
              {...register("name", {
                required: "Name Is Required",
              })}
            />
          </div>
          {errors.name && (
            <p className="alert alert-danger">{errors.name.message}</p>
          )}
          <div className="input-group mt-4">
            <select
              className="form-select bg-light"
              {...register("tagId", {
                required: "TagId  Is Required",
              })}
            >
              <option value="">Tag</option>
              {tagsId.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          {errors.tagId && (
            <p className=" alert alert-danger">{errors.tagId.message}</p>
          )}
          <div className="input-group my-4 ">
            <input
              type="text"
              className="form-control bg-light"
              placeholder="Recipe Price"
              {...register("price", {
                required: "price Is Required",
              })}
            />
          </div>
          {errors.price && (
            <p className="alert alert-danger">{errors.price.message}</p>
          )}
          <div className="input-group mt-4">
            <select
              className="form-select bg-light"
              {...register("categoriesIds", {
                required: "Categories Id Is Required",
              })}
            >
              <option value="">Category</option>
              {categoriesList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {errors.categoriesIds && (
            <p className=" alert alert-danger">
              {errors.categoriesIds.message}
            </p>
          )}
          <div className="input-group mt-4">
            <textarea
              className="form-control bg-light"
              placeholder="Description"
              {...register("description", {
                required: "Description Is Required",
              })}
            />
          </div>
          {errors.description && (
            <p className="alert alert-danger">{errors.description.message}</p>
          )}
          <div className="input-group my-4 ">
            <input
              type="file"
              className="form-control bg-light"
              {...register("recipeImage", {
                required: "Recipe Image Is Required",
              })}
            />
          </div>
          {errors.recipeImage && (
            <p className="alert alert-danger">{errors.recipeImage.message}</p>
          )}
          <button className=" button-style rounded-2 w-100 text-white fw-semibold py-2 my-2">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
