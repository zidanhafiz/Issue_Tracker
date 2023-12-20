import { toast } from 'react-toastify';

enum StatusEnum {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}

export const getStatusType = (status?: string | null) => {
  switch (status) {
    case 'open':
      return StatusEnum.OPEN;
    case 'in_progress':
      return StatusEnum.IN_PROGRESS;
    case 'closed':
      return StatusEnum.CLOSED;
    case 'all':
      return 'ALL';
    case '':
      return 'ALL';
    case null:
      return 'ALL';
    case undefined:
      return 'ALL';
    default:
      return false;
  }
};

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
      return { name: 'Open', color: 'blue', value: 'OPEN' };
    case 'IN_PROGRESS':
      return { name: 'In Progress', color: 'orange', value: 'IN_PROGRESS' };
    case 'CLOSED':
      return { name: 'Closed', color: 'green', value: 'CLOSED' };
    default:
      return {} as Status;
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
  handle: (id?: number) => Promise<void> | void;

  constructor(prop: Message, handle: (id?: number) => Promise<void> | void) {
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
