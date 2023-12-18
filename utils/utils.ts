import { toast } from 'react-toastify';

export const createStatus = (status: string) => {
  switch (status) {
    case 'OPEN':
      return 'IN_PROGRESS';
    case 'IN_PROGRESS':
      return 'CLOSED';
    default:
      return 'OPEN';
  }
};

export const getNextStatus = (status: string) => {
  switch (status) {
    case 'OPEN':
      return 'Solve Issue';
    case 'IN_PROGRESS':
      return 'Close Issue';
    default:
      return 'Open Issue';
  }
};

export const createStatusObject = (status: string): Status => {
  switch (status) {
    case 'OPEN':
      return { name: 'Open', color: 'blue' };
    case 'IN_PROGRESS':
      return { name: 'In Progress', color: 'orange' };
    default:
      return { name: 'Closed', color: 'green' };
  }
};

export const formatDate = (dateString: string) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-US',
    options as Intl.DateTimeFormatOptions
  );
  return formattedDate;
};

export class Modal {
  message: Message;
  handle: (id: number) => Promise<void>;

  constructor(prop: Message, handle: (id: number) => Promise<void>) {
    this.message = prop;
    this.handle = handle;
  }
}

export const notificationAlert = (type: 'success' | 'error', message: string) => {
  toast(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    type: type,
  });
};
