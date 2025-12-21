export default function ConfirmModal({ 
  title = "Confirmer l'action", 
  message = "Êtes-vous sûr ?", 
  onConfirm, 
  onCancel 
}) {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onCancel}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              Annuler
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
