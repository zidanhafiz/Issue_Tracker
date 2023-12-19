import { IssueForm } from '@/app/issues/new/page';
import { Dispatch, SetStateAction } from 'react';
import { notificationAlert } from './utils';

type CreateIssue = {
  data: IssueForm;
  setIsSubmit: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
};

export const baseUrl = process.env.BASE_URL;
export const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getIssues = async (q?: string | string[], s?: string | string[]) => {
  const search = q === undefined ? '' : q;
  const status = s === undefined ? '' : s;

  try {
    const res = await fetch(`${baseUrl}/api/issues?q=${search}&s=${status}`, {
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

export const getIssueDetail = async (id: number, isClient = false) => {
  try {
    const res = await fetch(`${isClient ? publicUrl : baseUrl}/api/issues/${id}`, {
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

export const createIssue = async (
  { data, setIsSubmit, setError }: CreateIssue,
  callback: () => void
) => {
  setIsSubmit(true);
  try {
    const res = await fetch(`${publicUrl}/api/issues`, {
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
    setError(true);
    notificationAlert('error', 'Error create issue!');
    console.error(error);
  }
};

export const deleteIssue = async (id: number) => {
  try {
    const res = await fetch(`${publicUrl}/api/issues/${id}`, {
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
    const res = await fetch(`${publicUrl}/api/issues/${id}`, {
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
