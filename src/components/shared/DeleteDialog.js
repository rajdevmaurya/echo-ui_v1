import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';
import Button from '../UI/Button';

function DeleteDialog({ job, deleteJob }) {
  const modalRef = useRef(null);
  const [modalInstance, setModalInstance] = useState(null);

  useEffect(() => {
    if (modalRef.current) {
      const instance = M.Modal.init(modalRef.current, { dismissible: true });
      setModalInstance(instance);
    }

    return () => {
      if (modalInstance) {
        modalInstance.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    if (job?.id) {
      deleteJob(job.id);
    }
    modalInstance?.close(); // Ensure modal closes after action
  };

  return (
    <div ref={modalRef} id="deleteModal" className="modal">
      <div className="modal-content">
        <h4>Delete Job?</h4>
        <p>
          Do you confirm the deletion of
          <span className="blue-text text-darken-3"> {job?.company} </span>
          job, ID <span className="blue-text text-darken-3">{job?.id}</span>?
        </p>
      </div>
      <div className="modal-footer">
        <Button varient="text" className="modal-close" style={{ backgroundColor: 'transparent', color: '#000' }}>No</Button>
        <Button className="modal-close red darken-3" handleClick={handleDelete}>Yes</Button>
      </div>
    </div>
  );
}

export default DeleteDialog;
