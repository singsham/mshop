import React from "react";

const displayMedia = (props) => {
  if(props.mediaFiles==null)
    return null
  const mediaLink = props.mediaFiles.map((fileUrl, index) => (
    <li className="list-group-item" key={index}>
      <audio controls>
        <source src={fileUrl} type="audio/mpeg" />
      </audio>
    </li>
  ));
  return (
    <div>
      <ul className="list-group">{mediaLink}</ul>
    </div>
  );
};

export default displayMedia;
