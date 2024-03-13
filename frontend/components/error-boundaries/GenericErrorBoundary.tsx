'use client';

import { Button } from '@nextui-org/react';

export const GenericErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div
      className={
        'flex flex-col w-full justify-center items-center h-full gap-4'
      }
    >
      <h2>{error.message}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
};
