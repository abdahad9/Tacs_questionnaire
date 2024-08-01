// app/summary/page.tsx

'use client';

import React from 'react';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import useStore from '../../store/useStore';
// import * as XLSX from 'xlsx';

const Summary: React.FC = () => {
  const router = useRouter();
  const { answers } = useStore((state) => ({
    answers: state.answers,
  }));

  return (
    <>
        <Typography variant="h4" className="my-6 text-center">Thank You for Completing the Questionnaire</Typography>
        <div className="flex justify-between mt-6">
        </div>
        </>
  );
};

export default Summary;
