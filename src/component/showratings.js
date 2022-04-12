import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
export default function ShowRating(props) {
  const array = [];
  for (let i = 0; i < (props.max || 5); i++) {
    if (i < props.rating)
      array.push(
        <AiFillStar
          key={i}
          style={{ fill: "orange", width: props.width, height: props.width }}
        ></AiFillStar>
      );
    else
      array.push(
        <AiOutlineStar
          key={i}
          style={{ width: props.width, height: props.width }}
        ></AiOutlineStar>
      );
  }

  return <>{array}</>;
}
