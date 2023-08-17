 const [message, setMessage] = useState("")
  const [list,setList] = useState([])

  const handlesubmit = (e) => {
    e.preventDefault()
    console.log(message)
    if (message !== "") {
      /////////////////setList([{ id: `${message}-${Date.now()}`, message }])
    }
    
    setMessage("")
  }



  import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [editedMessage, setEditedMessage] = useState("");
  const [editId, setEditId] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      setList([{ id: `${message}-${Date.now()}`, message }, ...list]);
    }
    setMessage("");
  };

  const handleDelete = (id) => {
    const filterrecord = list.filter((v) => v.id !== id);
    setList(filterrecord);
  };

  const handleEdit = (id, initialMessage) => {
    setEditedMessage(initialMessage);
    setEditId(id);
  };

  const handleUpdate = () => {
    const updatedList = list.map((item) => {
      if (item.id === editId) {
        return { ...item, message: editedMessage };
      }
      return item;
    });
    setList(updatedList);
    setEditId("");
    setEditedMessage("");
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
          <button type="submit">Go</button>
        </form>
        <ul className="allTodos">
          {list.map((data) => (
            <li className="singleTodo" key={data.id}>
              {data.id === editId ? (
                <>
                  <input
                    type="text"
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Update</button>
                </>
              ) : (
                <>
                  <span className="todo">{data.message}</span>
                  <button onClick={() => handleEdit(data.id, data.message)}>edit</button>
                  <button onClick={() => handleDelete(data.id)}>delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
