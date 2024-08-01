"use client";

import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, FormControlLabel, RadioGroup, Radio, FormLabel, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import useStore from '../../store/useStore';
import * as XLSX from 'xlsx'


const ClientData: React.FC = () => {
  const { profile, setProfile, loadProfileFromStorage } = useStore();
  const router = useRouter();
  const [formData, setFormData] = useState(profile);

  const [errors, setErrors] = useState({
    name: false,
    age: false,
    email: false,
    city: false,
    state: false,
    education: false,
    // yearsSinceRetired: false,
    // yearsUntilRetire: false,
    retirementChoice: false,
  });

  useEffect(() => {
    loadProfileFromStorage();
  }, [loadProfileFromStorage]);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    // Validation logic for retirement years
    if (name === 'yearsSinceRetired' && value !== '') {
      updatedFormData.yearsUntilRetire = Number(value) > 0 ? 0 : formData.yearsUntilRetire;
    }
    if (name === 'yearsUntilRetire' && value !== '') {
      updatedFormData.yearsSinceRetired = Number(value) > 0 ? 0 : formData.yearsSinceRetired;
    }

    setFormData(updatedFormData);
    setErrors({ ...errors, [name]: false });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name,
      age: !formData.age || isNaN(Number(formData.age)),
      email: !formData.email || !validateEmail(formData.email),
      city: !formData.city,
      state: !formData.state,
      education: !formData.education,
      // yearsSinceRetired: !formData.yearsSinceRetired,
      // yearsUntilRetire: !formData.yearsUntilRetire,
      retirementChoice: !formData.retirementChoice,
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
    } else {
      setProfile(formData);
      router.push('/questions/1');
    }
  };

  return (
    <>
      <Typography variant="h5" className="mb-4">Client Data</Typography>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
            error={errors.name}
            helperText={errors.name && "Name is required"}
          />
          <TextField
            name="age"
            label="Age"
            type="number"
            fullWidth
            value={formData.age}
            onChange={handleChange}
            required
            error={errors.age}
            helperText={errors.age && "Age is required"}
          />
          <TextField
            name="email"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
            helperText={errors.email && "Valid email is required"}
          />
          <TextField
            name="city"
            label="City"
            fullWidth
            value={formData.city}
            onChange={handleChange}
            required
            error={errors.city}
            helperText={errors.city && "City is required"}
          />
          <TextField
            name="state"
            label="State"
            fullWidth
            value={formData.state}
            onChange={handleChange}
            required
            error={errors.state}
            helperText={errors.state && "State is required"}
          />
          <FormControl fullWidth required error={errors.education}>
            <InputLabel>Highest Education</InputLabel>
            <Select name="education" value={formData.education} onChange={handleSelectChange}>
              <MenuItem value="HS">High School</MenuItem>
              <MenuItem value="Undergraduate">Undergraduate</MenuItem>
              <MenuItem value="Post-graduate">Post-graduate</MenuItem>
            </Select>
            {errors.education && <Typography color="error">Education is required</Typography>}
          </FormControl>
          <TextField
            name="yearsSinceRetired"
            label="How many years since retired"
            type="number"
            fullWidth
            value={formData.yearsSinceRetired}
            onChange={handleChange}
          />
          <TextField
            name="yearsUntilRetire"
            label="How many years until you expect to retire"
            type="number"
            fullWidth
            value={formData.yearsUntilRetire}
            onChange={handleChange}
          />
          <FormControl component="fieldset" required error={errors.retirementChoice}>
            <FormLabel id="demo-radio-buttons-group-label">Was retirement your choice</FormLabel>
            <RadioGroup
              row
              name="retirementChoice"
              value={formData.retirementChoice}
              onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            {errors.retirementChoice && <Typography color="error">Retirement choice is required</Typography>}
          </FormControl>
        </div>
        <hr className="my-6" />
        <div className="flex justify-end">
          <Button variant="contained" color="primary" type="submit">
            Start Questionnaire
          </Button>
        </div>
      </form>
    </>
  );
};

export default ClientData;
