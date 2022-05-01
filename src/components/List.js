import React, { useState } from "react";
import { UilEdit } from "@iconscout/react-unicons";
import { UilTimesCircle } from "@iconscout/react-unicons";
import { UilTextStrikeThrough } from "@iconscout/react-unicons";
export default function List({ removeItem, title, id, editItem }) {
  const [strk, setStrk] = useState(false);
  const strike = () => {
    setStrk(!strk);
  };
  return (
    <div className="list">
      <article key={id} className="item">
        <p className="title" style={{ textDecoration: strk ? "line-through" : "none" }}>
          {title}
        </p>
        <div className="flex">
          <button type="submit" className="btnStrike" onClick={strike}>
            <UilTextStrikeThrough color="blue" size="30" />
          </button>
          <button type="submit" className="btnEdit" onClick={() => editItem(id)}>
            <UilEdit color="green" />
          </button>
          <button onClick={() => removeItem(id)} type="submit" className="btnDel">
            <UilTimesCircle color="red" size="25" />
          </button>
        </div>
      </article>
    </div>
  );
}
