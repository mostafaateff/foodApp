import React from 'react'
import { Link } from 'react-router-dom';

export default function RecipeListHeader() {
  return (
    <div className="shared-header rounded-3 p-3 m-3 ">
      <div className="row justify-content-between  align-items-center ">
        <div className="col-md-6">
          <h4>
            Fill The <span>Recipes</span> !
          </h4>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <div className="col-md-6 shared-link text-end">
          <Link to={"/dashboard/recipes"} className="notfound-button px-5 py-3 rounded-3 fw-semibold ">
            Fill Recipes{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
