import { useState } from "react";

import Counter from "./Counter";
import Profile from "./Profile";

export default function ConditionalComponent() {
  const [display, setDisplay] = useState(false);
  let output = <div></div>;
  if (display) {
    output = <Counter></Counter>;
  } else {
    output = <Profile name="Jana" username="janata"></Profile>;
  }
  return <div>{output}</div>;
}
