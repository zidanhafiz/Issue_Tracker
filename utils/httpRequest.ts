import { IssueForm } from '@/app/issues/new/page';
import { Dispatch, SetStateAction } from 'react';
import { notificationAlert } from './utils';

export const baseUrl = process.env.BASE_URL as string;

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

export const getIssues = async (url: string | null, q?: Query, s?: Query, b?: Query) => {
  const search = q === undefined ? '' : q;
  const status = s === undefined ? '' : s;
  const sort = b === undefined ? '' : b;

  const fetchUrl =
    url !== null
      ? `${url}/api/issues?q=${search}&s=${status}&b=${sort}`
      : `/api/issues?q=${search}&s=${status}&b=${sort}`;

  try {
    const res = await fetch(fetchUrl, {
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

export const getIssueDetail = async (url: string | null, id: number) => {
  const fetchUrl = url !== null ? `${url}/api/issues/${id}` : `/api/issues/${id}`;
  try {
    const res = await fetch(fetchUrl, {
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
  data: IssueForm;
  setIsSubmit: Dispatch<SetStateAction<boolean>>;
};

export const createIssue = async (
  { data, setIsSubmit }: CreateIssue,
  callback: () => void
) => {
  setIsSubmit(true);
  try {
    const res = await fetch(`/api/issues`, {
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

export const deleteIssue = async (id: number) => {
  try {
    const res = await fetch(`/api/issues/${id}`, {
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

export const updateIssue = async (id: number, issue: Issue, callback: () => void) => {
  try {
    const res = await fetch(`/api/issues/${id}`, {
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
