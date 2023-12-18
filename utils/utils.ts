export const formatDate = (dateString: string) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-US',
    options as Intl.DateTimeFormatOptions
  );
  return formattedDate;
};

export const getStatusObject = (key: string) => {
  const issueStatus: IssueStatus = {
    OPEN: {
      name: 'Open',
      color: 'blue',
    },
    IN_PROGRESS: {
      name: 'In Progress',
      color: 'orange',
    },
    CLOSED: {
      name: 'Closed',
      color: 'green',
    },
  };
  return issueStatus[key] || { name: 'Open', color: 'blue' };
};

export class Modal {
  message: Message;
  handle: (id: number) => Promise<void>;

  constructor(prop: Message, handle: (id: number) => Promise<void>) {
    this.message = prop;
    this.handle = handle;
  }
}
