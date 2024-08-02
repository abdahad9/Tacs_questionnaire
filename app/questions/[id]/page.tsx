'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Typography, RadioGroup, Radio, FormControlLabel, FormControl, TextField } from '@mui/material';
import useStore from '../../../store/useStore';
import questions from '../../data/questions';
import Link from 'next/link';
import * as XLSX from 'xlsx'

interface Rating {
    name: string | undefined;
    rating: string;
}

const QuestionPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const questionId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id, 10);

  const { answers, updateAnswer, loadAnswersFromStorage, profile } = useStore((state) => ({
    answers: state.answers,
    updateAnswer: state.updateAnswer,
    loadAnswersFromStorage: state.loadAnswersFromStorage,
    profile: state.profile
  }));
  
  const [answer, setAnswer] = useState(answers[questionId] || {});
  const [error, setError] = useState('');

  const question = questions.find(q => q.id === questionId);
  const group = question?.group || '';
  const isGroupIncluded = ['Please answer the following question “Yes” or “No”', 'Professional Skills', 'Causes', 'Topics of Interest', 'Life Topics'].includes(group);


  useEffect(() => {
    if (!question) {
      router.push('/404');
    }
  }, [question, router]);

  useEffect(() => {
    loadAnswersFromStorage();
  }, [loadAnswersFromStorage]);

  useEffect(() => {
    setAnswer(answers[questionId] || {});
  }, [answers, questionId]);

  const handleChange = (index: number, value: string) => {
    setError('');
    setAnswer((prevAnswer: any) => {
      const updatedAnswer = { ...prevAnswer, [index]: value };
      updateAnswer(questionId, updatedAnswer);
      return updatedAnswer;
    });
  };

  const handleNext = () => {
    if (Object.values(answer).length === 0 || Object.values(answer).some(value => value === '')) {
      setError('Please answer the question.');
      return;
    }
    setError('');
    updateAnswer(questionId, answer);
    if (questionId < questions.length) {
      router.push(`/questions/${questionId + 1}`);
    } else {
        generateExcel(profile, answers);
      router.push('/summary'); // Assuming there's a summary page after the last question
    }
  };

  const generateExcel = async (data: any, answers: Record<number, any>) => {

    type TransformedItem = {
        questionId: number;
        numericValue?: number;
        ratings: { [key: number]: Rating };
    };
// Transform answers
    const transformed: TransformedItem[] = Object.entries(answers).map(([questionId, answer]) => {
        const questionIdNum = parseInt(questionId);
        let numericValue: number | undefined;
        let ratings: { [key: number]: Rating } = {};

        if (answer[0] === "yes" && questionIdNum < 11) {
            numericValue = 10;
        } else if (answer[0] === "no" && questionIdNum < 11) {
            numericValue = 0;
        } else if (questionIdNum > 53 && questionIdNum < 58) {
            const question = questions.find(q => q.id === questionIdNum);

            if (question && question.options) {
                for (const [index, rating] of Object.entries(answer)) {
                    const optionIndex = parseInt(index);
                    const optionName = question.options[optionIndex];
                    const ratingValue = rating as string;
                    if (optionName !== undefined) {
                        ratings[optionIndex] = { name: optionName, rating: ratingValue };
                    }
                }
            }
      } else {
    // Find the question based on questionIdNum
    const question = questions.find(q => q.id === questionIdNum);

    // Check if question and question.options are defined and is an array
    if (question && Array.isArray(question.options)) {
        // Find the index of the answer in the options
        const index = question.options.findIndex(value => value === answer[0]);
        
        // If index is -1, it means the answer was not found; handle it as needed
        numericValue = index !== -1 ? index + 1 : undefined; // or handle as needed
    } else {
        // Handle cases where the question or options are not available
        numericValue = undefined; // or handle as needed
    }
}

        return { questionId: questionIdNum, numericValue, ratings };
    });

    // Separate ratings from the transformed answers
    const ratings: { [key: number]: Rating[] } = {};
    transformed.forEach(({ questionId, ratings: questionRatings }) => {
        if (Object.keys(questionRatings).length > 0) {
            ratings[questionId] = Object.values(questionRatings);
        }
    });

    // Transformed data for other purposes
    const filteredTransformedData = transformed.filter(({ questionId, numericValue }) => {
        if (numericValue != undefined) {
            return [questionId, numericValue]; // Exclude rating questions from transformed data
        }
    });

    const worksheetData = [
        ['Field', 'Value'],
        ['Name', data.name],
        ['Age', data.age],
        ['Email', data.email],
        ['City', data.city],
        ['State', data.state],
        ['Education', data.education],
        ['Years Since Retired', data.yearsSinceRetired],
        ['Years Until Retire', data.yearsUntilRetire],
        ['Retirement Choice', data.retirementChoice],
        ['', ''], // Empty row for separation
        ['Questionnaire', 'Answers']
    ];

    for (const [questionId, answer] of Object.entries(filteredTransformedData)) {
        worksheetData.push([`Question ${parseInt(questionId) + 1}`, answer.numericValue]);
    }

    worksheetData.push(['', '']); // Another empty row for separation
    worksheetData.push(['Ratings', '']);

    for (const [questionId, ratingData] of Object.entries(ratings)) {
        for (const { name, rating } of Object.values(ratingData)) {
            worksheetData.push([name, rating]);
        }
    }


    // Code to generate Excel file from worksheetData goes here...

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Profile Data');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    // return buffer;

    // Sanitize the user's name to create a valid filename
    const sanitizedFileName = data.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `${sanitizedFileName}_profile_data.xlsx`;

    
    try {
        const response = await fetch('/api/upload-drive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'X-Filename': filename, // Optional: Pass filename in headers
            },
            body: buffer, // Send buffer directly
        });

        if (!response.ok) {
            console.error('Failed to upload data:', response.statusText);
            return;
        }

        const result = await response.json();
        console.log('Upload result:', result);
    } catch (error) {
        console.error('Error uploading file:', error);
    }

    // Save to file
    // XLSX.writeFile(workbook, filename);
  };
  

  const handlePrevious = () => {
    updateAnswer(questionId, answer);
    if (questionId > 1) {
      router.push(`/questions/${questionId - 1}`);
    }
  };

  return (
     // <div className="flex flex-col items-center justify-center h-screen">
     <>
       <div className={`flex ${isGroupIncluded ? 'justify-between' : 'justify-end'} mb-4`}>
      {isGroupIncluded ? (
        <Typography variant="h5">{question?.group}</Typography>
      ) : ''}
       <Typography variant="h6">{`Answered: ${Object.keys(answers).length}/${questions.length}`}</Typography>
     </div>
   <div className="w-full p-8 bg-white rounded shadow">
        <Typography variant="body1" className="mb-6">
          {`${questionId} ) `} {question?.text}
        </Typography>
        {question?.type === 'yesno' ? (
          <FormControl component="fieldset">
            <RadioGroup
              name={`question-${questionId}`}
              value={answer[0] || ''}
              onChange={(e) => handleChange(0, e.target.value)}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        ) : question?.type === 'multiple' ? (
          <FormControl component="fieldset">
            <RadioGroup
              name={`question-${questionId}`}
              value={answer[0] || ''}
              onChange={(e) => handleChange(0, e.target.value)}
            >
              {question?.options?.map((option, index) => (
                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </FormControl>
        ) : question?.type === 'ranking' ? (
          question.options?.map((option, index) => (
            <div key={index}>
              <Typography>{option}</Typography>
              <RadioGroup
                row
                name={`question-${questionId}-${index}`}
                value={answer[index] || ''}
                onChange={(e) => handleChange(index, e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((rank) => (
                  <FormControlLabel key={rank} value={rank.toString()} control={<Radio />} label={rank.toString()} />
                ))}
              </RadioGroup>
            </div>
          ))
        ) : (
          <TextField
            name={`question-${questionId}`}
            label="Your Answer"
            fullWidth
            value={answer[0] || ''}
            onChange={(e) => handleChange(0, e.target.value)}
          />
        )}
        {error && <Typography color="error" className="mt-2">{error}</Typography>}
        <hr className="my-6" />
        <div className="flex justify-between mt-6">
          {questionId > 1 && (
            <Button variant="outlined" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {questionId === 1 && (
            <Link href="/form-data">
              <Button variant="outlined">
                Previous
              </Button>
            </Link>
          )}
          <Button variant="contained" color="primary" onClick={handleNext}>
            {questionId < questions.length ? 'Next' : 'Finish'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
