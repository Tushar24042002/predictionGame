import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

const Loader = ({ target }) => {
  const [show, setShow] = useState(0);
  useEffect(() => {
    if (target) {
      target.loading = function (loading) {
        setShow((state) => {
          state = state + (loading ? 1 : -1);
          return state > 0 ? state : 0;
        });
      };
      return () => delete target.loading;
    }
  }, [target]);
  console.log(Boolean(show))
  return (
    Boolean(show) && (
      <Modal>
        <div>Loading</div>
     </Modal>
    )
  );
};

export default Loader;
