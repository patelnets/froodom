'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import useSWRMutation from 'swr/mutation';

// @ts-ignore
async function sendRequest(url, { arg }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: {
      Authorization:
        'eyJraWQiOiJIQ2duMnNJaXhvT2hWVStHMXpHUFA2cVM1clFlWDJkZUdyeE0zTktraldFPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoieHcxSEhXZUx0alJxclVZaHQ3M0JaQSIsInN1YiI6ImY2NGJhN2VmLTU0ZjMtNDQ3NS1hOWRkLTY5MjFhM2JlNDY1NSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfS3VIMWdRUUtuIiwiY29nbml0bzp1c2VybmFtZSI6InZhdHNhbCIsIm5vbmNlIjoidlRYS3J2MDdBZDNjQlNwSTBmY28ySVdXdndVcUpwcjBFOHZIM1E3WWZTdyIsIm9yaWdpbl9qdGkiOiIxZThiZGI1Yy00OTJiLTRjZjgtOGQ2Yy1lNjljNWM2NzJhMTciLCJhdWQiOiIxMHBpYzBhcGdudjJzOGtiNnFzMXEyczdubiIsImV2ZW50X2lkIjoiZTc5NDgxZDItNjA5Yi00MWYxLWIxY2QtYzhjOWVhMmRmZGZmIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MDUzNTQyNTQsImV4cCI6MTcwNTM1Nzg1NCwiaWF0IjoxNzA1MzU0MjU0LCJqdGkiOiI0MmMxMWFlZC1jYTFlLTRiM2QtYTYwMi1hNGYwZmRmNmMzNjIiLCJlbWFpbCI6InZhdHoxOTk2QGdtYWlsLmNvbSJ9.Wn1UdJlzvRanLfHVgGeRo7C8ReAptUPZs_e137xUoEuIOTh26-A58BReQCh3SgRZPug_EsOVKtzcpYCgBNoLmoyoFxXexXOj6iWM-UyZ4jKBWe9N79f2-yuG95d6_Ws4Oo0CYwYs8diorWweDVT41D0cZ8M2PWJOImMFZrJYTMGHVJM6j0NJ0O0Bgof3YQ_Zp4B7KyYTvKfwC9ohGV0Fiq79YYtwsWpPd9VZOBHc_z1DnoKfHqeHM1oUyWsjVTGn_WbjyZKiEuWDPsuwcaFQpPdv7v-6zJCbf8o8JsWO6gRviIyzgCGUK0ipbxbhKxh1pA1YSNcjbWjN3QxEyw1BSA',
    },
  });
}

const DataFetching = () => {
  const { data, error, trigger } = useSWRMutation(
    'https://8b0z64x58c.execute-api.eu-west-2.amazonaws.com/prod/form',
    sendRequest
  );

  // if (isLoading) return <button>loading...</button>

  // render data
  return (
    <button
      onClick={() => {
        trigger({});
      }}
    >
      Hello
    </button>
  );
};

export default function Home() {
  return null;
}
