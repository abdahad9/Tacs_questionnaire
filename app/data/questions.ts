const questions = [
  // Group 1: Yes/No Questions
  { id: 1, text: 'I have found retirement to be a little boring.', type: 'yesno', group: 'Please answer the following question “yes” or “No”' },
  { id: 2, text: 'I enjoy having a daily plan of structured activities.', type: 'yesno', group: 'Please answer the following question “yes” or “No”' },
  { id: 3, text: 'I like to do things on the spur of the moment.', type: 'yesno', group: 'Please answer the following question “yes” or “No”' },
  { id: 4, text: 'I feel ready to start a new chapter in my life.', type: 'yesno', group: 'Please answer the following question “yes” or “No”' },
  { id: 5, text: 'I enjoy traveling to foreign countries where I don’t speak the language.', type: 'yesno', group: 'Please answer the following question “yes” or “No”' },
  { id: 6, text: 'I consider myself to be an early adaptor of new technology.', type: 'yesno', group: 'Please answer the following question “yes” or “No”' },
  { id: 7, text: 'I don’t like things that are predictable.', type: 'yesno', group: 'Please answer the following question “yes” or “No”' },
  { id: 8, text: 'I have enjoyed many of the same hobbies for years.', type: 'yesno', group: 'Please answer the following question “yes” or “No”' },
  { id: 9, text: 'I like moving and setting up a new home.', type: 'yesno', group: 'Please answer the following question “yes” or “No”' },
  { id: 10, text: 'I enjoy trying new things.', type: 'yesno', group: 'Please answer the following question “yes” or “No”' },

  // Group 2: Overall Adjustment
  { id: 11, text: 'Are you enjoying retirement as much as you thought you would? ', type: 'multiple', group: 'Overall adjustment', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
  { id: 12, text: 'Do you ever think about going back to work part-time?', type: 'multiple', group: 'Overall adjustment', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Definitely Yes'] },
  { id: 13, text: 'Would you say your work created your personal identity?', type: 'multiple', group: 'Overall adjustment', options: ['A Lot', 'Quite a bit', 'Moderately', 'Hardly at all', 'Not At All'] },
  { id: 14, text: 'How important is it for you to have a written plan for life in retirement?', type: 'multiple', group: 'Overall adjustment', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
  { id: 15, text: 'How would you rate your ability to deal with change in your personal life?', type: 'multiple', group: 'Overall adjustment', options: ['Very Poorly',	'Somewhat Poorly', 'Could Do Better', 'Good Enough', 'Very Well'] },

  // Group 3: Personal Enrichment
  { id: 16, text: 'Do you currently have any hobbies, interests, or activities not related to your work?', type: 'multiple', group: 'Personal Enrichment', options: ['None At All',	'Not yet', 'Working On It',	'Yes-a few', 'Yes–a Lot'] },
  { id: 17, text: 'How important is lifelong learning in your retirement?', type: 'multiple', group: 'Personal Enrichment', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },

  //  Social Activities:
//     { id: 18, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 19, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 20, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 21, text: '', type: 'multiple', group: 'lllllll', options: [''] },

//   //  Relationships:
//     { id: 22, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 23, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 24, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 25, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 26, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 27, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 28, text: '', type: 'multiple', group: 'lllllll', options: [''] },

//    //  Community Engagement:
//     { id: 29, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 30, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 31, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 32, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 33, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//     { id: 34, text: '', type: 'multiple', group: 'lllllll', options: [''] },

//    //  Spirituality:
//    { id: 35, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 36, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 37, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 38, text: '', type: 'multiple', group: 'lllllll', options: [''] },

//    //  Health:
//    { id: 39, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 40, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 41, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 42, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 43, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 44, text: '', type: 'multiple', group: 'lllllll', options: [''] },   
//    { id: 45, text: '', type: 'multiple', group: 'lllllll', options: [''] },   

//    //  The following questions refer to your past or present work life:
//    { id: 46, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 47, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 48, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 49, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 50, text: '', type: 'multiple', group: 'lllllll', options: [''] },
//    { id: 51, text: '', type: 'multiple', group: 'lllllll', options: [''] },   
//    { id: 52, text: '', type: 'multiple', group: 'lllllll', options: [''] },   

   

  // Unnumbered ranking questions
//   { id: 3, text: 'How would you rate your professional skills (5 = most proficient) in each of the following categories?', type: 'ranking', group: 'Professional Skills', options: ['Financial', 'Managerial', 'Administrative', 'Creative', 'Technical: science'] },
//   { id: 54, text: 'What causes are important to you? (5 = most important)', type: 'ranking', group: 'Causes', options: ['Homelessness', 'Poverty', 'Child Welfare', 'Education'] },
//   { id: 55, text: 'What topics are of interest to you? (5 = most interested)', type: 'ranking', group: 'Topics of Interest', options: ['Art', 'Science', 'Politics'] },
//   { id: 56, text: 'What life topics are of most concern to you? (5 = most concerned)', type: 'ranking', group: 'Life Topics', options: ['Significant Medical Issues', 'Feeling Irrelevant'] }
];

export default questions;
