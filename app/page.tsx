import Image from "next/image";
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import Layout from './layout';

export default function Home() {
  return (
    <>
      <Typography className="mb-3" variant="h4">My Assessment</Typography>
      <Typography variant="body1" paragraph>
        The profile / assessment has three sections with a total of 56 questions. It will take about 20 minutes to complete.
        Your answers will be saved as you go, which allows you to navigate back to a previous question.
      </Typography>
      <Typography variant="body1" paragraph>
        When you're finished, you will have an opportunity for your coach (or one of ours if you don't already have one) to
        receive, review, and share your summary report with you.
      </Typography>
      <div className="flex justify-center mt-6">
        <Link href="/form-data">
          <Button variant="contained" color="primary">
            Let's Get Started!
          </Button>
        </Link>
      </div>
    </>
  );
}
