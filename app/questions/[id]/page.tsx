'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Typography, RadioGroup, Radio, FormControlLabel, FormControl, TextField } from '@mui/material';
import useStore from '../../../store/useStore';
import questions from '../../data/questions';
import Link from 'next/link';

const QuestionPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const questionId = parseInt(params.id, 10);

  const { answers, updateAnswer, loadAnswersFromStorage } = useStore((state) => ({
    answers: state.answers,
    updateAnswer: state.updateAnswer,
    loadAnswersFromStorage: state.loadAnswersFromStorage,
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
      router.push('/summary'); // Assuming there's a summary page after the last question
    }
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
