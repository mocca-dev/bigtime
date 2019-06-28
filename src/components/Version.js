import React, { useEffect, useState } from "react";

const Version = props => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    setVersion(process.env.REACT_APP_VERSION);
  }, []);

  return (
    <button className="btn" {...props}>
      v{version}
    </button>
  );
};

export default Version;
