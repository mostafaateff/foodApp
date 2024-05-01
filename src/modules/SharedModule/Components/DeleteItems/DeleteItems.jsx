// eslint-disable-next-line no-unused-vars
import React from "react";
import noData from "../../../../assets/no-data.png";

export default function DeleteItems({ itemName }) {
  return (
    <div className="text-center">
      <img className="w-25" src={noData} alt="" />
      <h4 className="py-3">Delete This {itemName} ?</h4>
      <p className="text-muted">
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
  );
}
