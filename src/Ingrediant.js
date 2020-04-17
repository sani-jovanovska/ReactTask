import React, { useState, useEffect } from "react";


export default function Ingrediant(props) {
  const [hide, setHide] = useState(true);
  const [ingrediants, setIngrediants] = useState([]);

  useEffect(() => {
    changeState();
  }, []);

  const changeState = () => {
    setHide(!hide);
    if (hide && (props.ingrediants && props.ingrediants.length > 3)) {
      setIngrediants(props.ingrediants.slice(0, 3));
    } else {
      setIngrediants(props.ingrediants);
    }
  };

  return (
    <div >
      {props.ingrediants.length > 3 ? (
        <div class="ingred-holder">
          {ingrediants.map((x, i, list) => (
            <div key={i} className="inline">
              {x}
              {list.length - i > 1 ? ", " : ""}
            </div>
          ))}
          <div />
          {hide ? (
            <button onClick={changeState}> Hide </button>
          ) : (
            <button onClick={changeState}> Show All </button>
          )}
        </div>
      ) : (
        <div>
          {props.ingrediants.map((x, i, list) => (
            <div className="inline" key={i}>
              {x}
              {list.length - i > 1 ? ", " : ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
