import { IssueForm } from '@/app/issues/new/page';
import { Dispatch, SetStateAction } from 'react';
import { notificationAlert } from './utils';

export const baseUrl = process.env.BASE_URL as string;
export const publicUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export const getTotalIssues = async (url: string) => {
  try {
    const res = await fetch(`${url}/api/issues/total`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

type Query = string | string[];

export const getIssues = async (url: string, q?: Query, s?: Query, b?: Query) => {
  const search = q === undefined ? '' : q;
  const status = s === undefined ? '' : s;
  const sort = b === undefined ? '' : b;

  try {
    const res = await fetch(`${url}/api/issues?q=${search}&s=${status}&b=${sort}`, {
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

export const getIssueDetail = async (url: string, id: number) => {
  try {
    const res = await fetch(`${url}/api/issues/${id}`, {
      next: { tags: ['issues'] },
    });

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

type CreateIssue = {
  url: string;
  data: IssueForm;
  setIsSubmit: Dispatch<SetStateAction<boolean>>;
};

export const createIssue = async (
  { url, data, setIsSubmit }: CreateIssue,
  callback: () => void
) => {
  setIsSubmit(true);
  try {
    const res = await fetch(`${url}/api/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Failed to submit data');
    }
    setIsSubmit(false);
    notificationAlert('success', 'Success create issue!');
    callback();
  } catch (error) {
    setIsSubmit(false);
    notificationAlert('error', 'Error create issue!');
    console.error(error);
  }
};

export const deleteIssue = async (url: string, id: number) => {
  try {
    const res = await fetch(`${url}/api/issues/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    notificationAlert('success', 'Success delete issue!');
  } catch (error) {
    console.error(error);
    notificationAlert('error', 'Error delete issue!');
  }
};

export const updateIssue = async (
  url: string,
  id: number,
  issue: Issue,
  callback: () => void
) => {
  try {
    const res = await fetch(`${url}/api/issues/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify(issue),
    });

    if (!res.ok) {
      throw new Error('Failed to update data');
    }
    notificationAlert('success', 'Success update issue!');
    callback();
  } catch (error) {
    notificationAlert('error', 'Error update issue!');
    console.error(error);
  }
};
