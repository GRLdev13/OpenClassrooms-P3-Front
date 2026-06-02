import { useState } from "react";
import Password from "./password";
import UpdateUser from "./user";
import Appeareance from "./appearance";

export default function MenuSelector() {
  const [index, setIndex] = useState(0);
  
  return (
    <div>
      <h1>Settings</h1>
      <select
        id="tags"
        value={index}
        onChange={(event) => {
          const i = Number.parseInt(event.target.value);
          setIndex(i);
        }}
        required
      >
        <option value="0">Profile</option>
        <option value="1">Password</option>
        <option value="2">Appearance</option>
      </select>
      
      {index === 0 && <UpdateUser />}
      {index === 1 && <Password />}
      {index === 2 && <Appeareance />}
    </div>
  );
}
