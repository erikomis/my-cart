import {
  Grid,
  Dialog,
  Divider,
  Typography,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

type ModalProps = {
  open: boolean;
  handleCloseModal: () => void;
  children: ReactNode;
  title?: string | ReactNode;
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl" | false;
  sx?: SxProps<Theme>;
  isTitleCenter?: boolean;
};

const Modal = ({
  open,
  handleCloseModal,
  children,
  title,
  maxWidth,
  sx,
  isTitleCenter,
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      maxWidth={maxWidth}
      fullWidth
      sx={sx}
    >
      <Grid container spacing={2} sx={{ padding: 1 }}>
        {title && (
          <Grid
            item
            xs={10}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isTitleCenter ? "center" : "flex-start",
            }}
          >
            {typeof title === "string" ? (
              <Typography id="modal-title" variant="h6" sx={{ ml: 1 }}>
                {title}
              </Typography>
            ) : (
              title
            )}
          </Grid>
        )}
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            position: title ? "relative" : "absolute",
            top: title ? "auto" : "-10px",
            right: title ? "auto" : "10px",
            zIndex: title ? "auto" : 10,
          }}
        >
          <IconButton aria-label="close" onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      {children}
    </Dialog>
  );
};

export default Modal;
