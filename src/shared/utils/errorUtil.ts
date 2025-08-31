import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getErrorMessage(err: unknown): string {
  if ((err as FetchBaseQueryError)?.status) {
    const e = err as FetchBaseQueryError;
    if (e.data && typeof e.data === 'object' && 'message' in e.data) {
      return (e.data as { message: string }).message;
    }
    return `API 오류 (status: ${e.status})`;
  }
  if ((err as SerializedError)?.message) {
    return (err as SerializedError).message as string;
  }
  return '알 수 없는 오류';
}
