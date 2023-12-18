import { redirect } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

export const getIssues = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/issues', {
      next: { tags: ['issues'] },
    });

    if (!res.ok) {
      throw new Error('Error get data');
    }

    const issues = await res.json();
    return issues;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getIssueDetail = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/issues/${id}`);

    if (!res.ok) {
      throw new Error('Error get data');
    }

    const issue = await res.json();
    return issue;
  } catch (error) {
    console.error(error);
    return null;
  }
};

type DeleteIssue = {
  id: number;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

export const deleteIssue = async ({ id, setIsError, setIsSuccess }: DeleteIssue) => {
  try {
    const res = await fetch(`http://localhost:3000/api/issues/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    setIsSuccess(true);
  } catch (error) {
    console.error(error);
    setIsError(true);
  }
};
