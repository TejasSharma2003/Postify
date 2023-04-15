import { toast } from 'react-toastify';
import './index.scss';

const toastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

const showNotification = (msg, status) => {
  if (status === 'success') {
    toast.success(msg, toastOptions);
  } else if (status === 'error') {
    toast.error(msg, toastOptions);
  } else {
    toast(msg, toastOptions);
  }
};

export default showNotification;
