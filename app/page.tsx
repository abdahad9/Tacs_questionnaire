"use client"
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Clear local storage when the component mounts
    localStorage.clear();
    }, []);
  return (
    <>
      <Typography className="mb-3" variant="h4">My Assessment</Typography>
      <Typography variant="body1" paragraph>
        The profile / assessment has three sections with a total of 57 questions. It will take about 20 minutes to complete.
        Your answers will be saved as you go, which allows you to navigate back to a previous question.
      </Typography>
      <Typography variant="body1" paragraph>
          Thanks for your participation!
      </Typography>
      <div className="flex justify-center mt-6">
        <Link href="/form-data">
          <Button variant="contained" color="primary">
            Let&apos;s Get Started!
          </Button>
        </Link>
      </div>
    </>
  );
}
