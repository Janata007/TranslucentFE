import { useState } from "react";

const Profile = ({ name, username }) => {
  const [counter, setCounter] = useState(0);
  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <h1>
        Name: {name}
        Username: {username}
      </h1>
      <div>Counter value: {counter}</div>
      <button onClick={increment}>Increment </button>
    </>
  );
};

export default Profile;
