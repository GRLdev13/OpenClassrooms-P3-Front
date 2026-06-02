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
          let i = Number.parseInt(event.target.value);
          setIndex(i);
          displayStuff(i);
        }}
        required
      >
        <option value="0">Profile</option>
        <option value="1">Password</option>
        <option value="2">Appearance</option>
      </select>
    </div>
  );
}

function displayStuff(index: number) {
  console.log("dispaly stuff called or wat:", index);
  if (index == 0) {
    return (<Password></Password>);
  }
  if (index == 1) {
    return (<UpdateUser></UpdateUser>);
  }
  if (index == 2) {
    return (<Appeareance></Appeareance>);
  }
}
