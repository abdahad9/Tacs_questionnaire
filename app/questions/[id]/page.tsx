'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Typography, RadioGroup, Radio, FormControlLabel, FormControl, TextField } from '@mui/material';
import useStore from '../../../store/useStore';
import questions from '../../data/questions';
import Link from 'next/link';
import * as XLSX from 'xlsx'

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
    //   console.log(updatedAnswer);
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
        console.log('profile :',profile);
        generateExcel(profile, answers);
      router.push('/summary'); // Assuming there's a summary page after the last question
    }
  };

  const generateExcel = (data: any, answers: Record<number, any>) => {

    const transformed = Object.entries(answers).map(([questionId, answer]) => {
        let numericValue;
        let ratings = {};
        
        if (answer[0] === "yes" && parseInt(questionId) < 11) {
            numericValue = 10;
        } else if (answer[0] === "no" && parseInt(questionId) < 11) {
            numericValue = 0;
        } else if (parseInt(questionId) > 53 && parseInt(questionId) < 58) {
            const question = questions.find(q => q.id === parseInt(questionId));

            if (question) {
                for (const [index, rating] of Object.entries(answer)) {
                    const optionIndex = parseInt(index);
                    const optionName = question?.options[optionIndex];
                    ratings[optionIndex] = { name: optionName, rating: rating };
                }
            }
        } else {
            // console.log('hello :',questions);
            const question = questions.find(q => q.id === parseInt(questionId));
            // console.log('question  :',question );
            const index = (question?.options ?? []).findIndex(value => value === answer[0]) + 1;
            // console.log('index :',index);
            numericValue = index;
        }
        
        return { questionId, numericValue, ratings };
    });
    // console.log('transformed :',transformed)

    // Separate ratings from the transformed answers
    const ratings = {};
    transformed.forEach(({ questionId, ratings: questionRatings }) => {
        if (Object.keys(questionRatings).length > 0) {
            ratings[questionId] = questionRatings;
        }
    });

    // Transformed data for other purposes
    // const transformedData = transformed.map(({ questionId, numericValue }) => {if(numericValue != undefined)[questionId, numericValue]});
    const filteredTransformedData = transformed.filter(({ questionId, numericValue }) => {
        if (numericValue != undefined) {
            // ratings[questionId] = questionRatings;
            return [questionId, numericValue]; // Exclude rating questions from transformed data
        }
        // return true;
    });
    // console.log('transformedData :',filteredTransformedData);
    console.log('data :',data);

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

    // console.log('transformedData :',transformedData);
    for (const [questionId, answer] of Object.entries(filteredTransformedData)) {
        // console.log('transformedData :',answer.numericValue);
        worksheetData.push([`Question ${parseInt(questionId) + 1}`, answer.numericValue]);
    }

    worksheetData.push(['', '']); // Another empty row for separation
    worksheetData.push(['Ratings', '']);

    // console.log('ratings :',ratings);
    for (const [questionId, ratingData] of Object.entries(ratings)) {
        for (const { name, rating } of Object.values(ratingData)) {
            worksheetData.push([name, rating]);
        }
    }

    // console.log('Worksheet Data:', worksheetData);

    // Code to generate Excel file from worksheetData goes here...

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Profile Data');

    // Sanitize the user's name to create a valid filename
    const sanitizedFileName = data.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `${sanitizedFileName}_profile_data.xlsx`;

    // Save to file
    XLSX.writeFile(workbook, filename);
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
     <div className="flex justify-between mb-4">
       <Typography variant="h5">{question?.group}</Typography>
       <Typography variant="h6">{`Answered: ${Object.keys(answers).length}/${questions.length}`}</Typography>
     </div>
   <div className="w-full p-8 bg-white rounded shadow">
     {/* <hr className="my-6" /> */}
    {/* <div className="flex flex-col items-center">
      <div className="w-full p-4 bg-white shadow-md rounded-md">
        <div className="flex justify-between mb-4">
          <Typography variant="h5">{question?.group}</Typography>
          <Typography variant="h6">{`Answered: ${Object.keys(answers).length}/${questions.length}`}</Typography>
        </div> */}
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
