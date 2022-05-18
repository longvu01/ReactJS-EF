// import { Close } from '@mui/icons-material';
// import { IconButton } from '@mui/material';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import Login from 'features/Auth/component/Login';
// import Register from 'features/Auth/component/Register';
// import { useState } from 'react';
// import styles from './DialogAuth.module.scss';

// const MODE = {
//   LOGIN: 'login',
//   REGISTER: 'register',
// };

// function DialogAuth() {
//   // React state
//   const [openDialog, setOpenDialog] = useState(false);
//   const [mode, setMode] = useState(MODE.LOGIN);

//   // Dialog
//   const handleClickOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <Dialog
//       className={styles.dialogRoot}
//       disableEscapeKeyDown
//       open={openDialog}
//       onClose={handleCloseDialog}
//     >
//       <IconButton className={styles.closeButton} onClick={handleCloseDialog}>
//         <Close />
//       </IconButton>

//       <DialogContent>
//         {mode === MODE.REGISTER && (
//           <Box>
//             <Register closeDialog={handleCloseDialog} />
//             <Box textAlign="center">
//               <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
//                 Already have an account? Login here
//               </Button>
//             </Box>
//           </Box>
//         )}
//         {mode === MODE.LOGIN && (
//           <Box>
//             <Login closeDialog={handleCloseDialog} />
//             <Box textAlign="center">
//               <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
//                 Don't have an account? Register here
//               </Button>
//             </Box>
//           </Box>
//         )}
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={handleCloseDialog}>Cancel</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default DialogAuth;
