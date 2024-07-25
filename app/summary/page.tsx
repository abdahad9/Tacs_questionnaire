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

//   const handleExportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       Object.keys(answers).map((key) => ({
//         questionId: key,
//         answer: JSON.stringify(answers[key]),
//       }))
//     );

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Answers');
//     XLSX.writeFile(workbook, 'answers.xlsx');
//   };

  return (
    // <div className="flex flex-col items-center justify-center h-screen p-4">
    //   <div className="w-full p-8 bg-white rounded shadow">
    <>
        <Typography variant="h4" className="my-6 text-center">Thank You for Completing the Questionnaire</Typography>
        <div className="flex justify-between mt-6">
          {/* <Button variant="contained" color="primary" onClick={handleExportToExcel}>
            Export to Excel
          </Button> */}
        </div>
        </>
    //   </div>
    // </div>
  );
};

export default Summary;
