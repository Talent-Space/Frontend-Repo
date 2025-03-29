import { Modal, Button } from "react-bootstrap";

export default function ProfileImageModal({ 
  show, 
  onHide, 
  onFileChange, 
  onUpload 
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Profile Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="file" accept="image/*" onChange={onFileChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onUpload}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
} 