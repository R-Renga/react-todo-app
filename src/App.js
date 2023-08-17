import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(0);

  const handlesubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const updatedText = list.map((data) =>
        data.id === editId
          ? (data = { id: data.id, message })
          : (data = { id: data.id, message: data.message })
      );
      setList(updatedText);
      setMessage("");
      setEditId(0);
      return;
    }

    if (message !== "") {
      setList([{ id: `${message}-${Date.now()}`, message }, ...list]);
    }

    setMessage("");
  };

  const handleDelete = (id) => {
    const filterrecord = list.filter((v) => v.id !== id);
    setList(filterrecord);
  };

  const handleEdit = (id) => {
    const listId = list.find((t) => t.id === id);
    setMessage(listId.message);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>TODO LIST APP</h1>
        <form className="todoform" onSubmit={handlesubmit}>
          <input
            style={{ width: "80%" }}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">{editId ? "update" : "Go"}</button>
        </form>
        <ul className="allTodos">
          {list.map((data) => (
            <li className="singleTodo" key={data.id}>
              <span className="todo">{data.message}</span>
              <button onClick={() => handleEdit(data.id)}>edit</button>
              <button onClick={() => handleDelete(data.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
