import React from 'react';

const ConfirmDelete = ({ setDeleteYes, setConfirmDelete }) => {
    const cancel = () => {
        setDeleteYes(false)
        setConfirmDelete(false);
    }
  return (
    <div className="modal-background">
      <div className="modal-content">
        <h1 style={{margin: '30px'}}>Are you sure you want to delete?</h1>
        <div className="modal-actions">
          <button style={{color: 'var(--code-orange)', margin: '10px', width: "100%"}}className="addNewButton" onClick={() => setDeleteYes(true)}>
            Confirm
          </button>
          <button style={{margin: '10px', width: "100%"}} className="addNewButton" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;