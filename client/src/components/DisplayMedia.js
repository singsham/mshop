import React from "react";

const displayMedia = (props) => {
  if(props.mediaFiles==null)
    return null
  const mediaLink = props.mediaFiles.map((files, index) => (
    <li className="list-group-item card border-light mb-1 shadow p-3 mb-5 bg-white rounded" key={index}>
      <video controls height="240" width="320">
        <source src={files.fileUrl} />
      </video>
      <h6 className="ml-3">Title : {files.fileName}</h6>
    </li>
  ));
  return (
      <ul className="col-lg-7 ml-2 list-group">{mediaLink}</ul>
  );
};

export default displayMedia;
