import "./App.css";
import React, { useState, useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";
import { UilPlus } from "@iconscout/react-unicons";
import { UilPen } from "@iconscout/react-unicons";
import { UilTrashAlt } from "@iconscout/react-unicons";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "hello ", type: "success" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Value Changed !");
    } else {
      showAlert(true, "success", "Item Added !");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show: show, type: type, msg: msg });
  };
  const clearList = () => {
    showAlert(true, "success", "List is Cleared !");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item Removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="h3">{alert.show && <Alert {...alert} removeAlert={showAlert} />}</div>

          <h3>Todo List</h3>
          <div className="form-control">
            <input
              type="text"
              className="todo"
              placeholder="eg. example"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit">
              {isEditing ? <UilPen /> : <UilPlus />}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="todo-container">
            {list.map((item) => {
              const { id, title } = item;
              return <List removeItem={removeItem} id={id} title={title} editItem={editItem} />;
            })}
            <button className="clear" onClick={clearList}>
              <UilTrashAlt />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
