import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [color, setColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors (colors.map(color =>{
          if (color.id === res.data.id) return res.data
          else return color
        }));
      })
      .catch(err => {
        console.log(err);
      });
    setEditing(false);
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`colors/${color.id}`)
    .then(res => { updateColors(colors.filter(color => color.id !== res.data));
    })
    .catch(err => {
      console.log(err);
    });
};

const submitColor = event => {
  event.preventDefault();
  axiosWithAuth()
  .post("/colors", color)
  .then(res => {window.location.reload()
})
  .catch(err => console.log(err.res));
}


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div>
                <h1>Add New Color</h1>
                <form onSubmit={submitColor}>
                    <input 
                    type="text"
                    name="color"
                    value={color.color}
                    onChange={e =>
                      setColor({ ...color, 
                        color: e.target.value })
                    }
                    placeholder='Color'
                    />
                    <input 
                    type="text"
                    name="code"
                    value={color.code.hex}
                    onChange={e =>
                      setColor({
                        ...color,
                        code: { hex: e.target.value }
                      })
                    }
                    placeholder='Code'
                    />
                    <button>Add</button>
                </form>
            </div>
    </div>
  );
};

export default ColorList;
