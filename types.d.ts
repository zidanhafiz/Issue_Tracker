type Issue = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  status: string;
  updatedAt: string;
};

type Color = 'ruby' | 'blue' | 'orange' | 'green';

type Status = {
  name: string;
  color: Color;
};

type IssueStatus = {
  OPEN: {
    name: string;
    color: Color;
  };
  IN_PROGRESS: {
    name: string;
    color: Color;
  };
  CLOSED: {
    name: string;
    color: Color;
  };
  [key: string]: Status | undefined;
};
