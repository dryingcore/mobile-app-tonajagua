import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
import { JSX, ReactNode } from "react";

export default function CustomModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}): JSX.Element {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            borderRadius: "12px",
          }}
        >
          {children}
          <Button
            onClick={onClose}
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            fullWidth
          >
            Fechar
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
