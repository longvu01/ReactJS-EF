import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './DialogDelete.module.scss';

function DialogDelete({
  showDialog = false,
  onChangeOpen,
  onDelete,
  isDeleteMore = false,
}) {
  const handleCloseDialog = () => {
    onChangeOpen(false);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(isDeleteMore);
    onChangeOpen(false);
  };

  return (
    <Dialog
      open={showDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={styles.title}>
        <WarningAmberIcon className={styles.titleIcon} />
        Xóa sản phẩm
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có muốn xóa {isDeleteMore && 'các '}sản phẩm đang chọn?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} className={styles.buttonCancel}>
          Xác nhận
        </Button>
        <Button
          onClick={handleCloseDialog}
          autoFocus
          className={styles.buttonActive}
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDelete;
