import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#121212',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Props definition
type CustomModalProps = {
  title: string;
  body: string;
  showModal: boolean;
  onClose: () => void;
};

export default function CustomModal({ title, body, showModal, onClose }: CustomModalProps) {
  return (
    <Modal
      open={showModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {body}
        </Typography>
      </Box>
    </Modal>
  );
}
