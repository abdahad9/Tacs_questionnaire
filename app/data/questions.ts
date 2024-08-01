const questions = [
  // Group 1: Yes/No Questions
  { id: 1, text: 'I have found retirement to be a little boring.', type: 'yesno', group: 'Please answer the following question “Yes” or “No”' },
  { id: 2, text: 'I enjoy having a daily plan of structured activities.', type: 'yesno', group: 'Please answer the following question “Yes” or “No”' },
  { id: 3, text: 'I like to do things on the spur of the moment.', type: 'yesno', group: 'Please answer the following question “Yes” or “No”' },
  { id: 4, text: 'I feel ready to start a new chapter in my life.', type: 'yesno', group: 'Please answer the following question “Yes” or “No”' },
  { id: 5, text: 'I enjoy traveling to foreign countries where I don’t speak the language.', type: 'yesno', group: 'Please answer the following question “Yes” or “No”' },
  { id: 6, text: 'I consider myself to be an early adaptor of new technology.', type: 'yesno', group: 'Please answer the following question “Yes” or “No”' },
  { id: 7, text: 'I don’t like things that are predictable.', type: 'yesno', group: 'Please answer the following question “Yes” or “No”' },
  { id: 8, text: 'I have enjoyed many of the same hobbies for years.', type: 'yesno', group: 'Please answer the following question “Yes” or “No”' },
  { id: 9, text: 'I like moving and setting up a new home.', type: 'yesno', group: 'Please answer the following question “Yes” or “No”' },
  { id: 10, text: 'I enjoy trying new things.', type: 'yesno', group: 'Please answer the following question “Yes” or “No”' },

  // Group 2: Overall Adjustment
  { id: 11, text: 'Are you enjoying retirement as much as you thought you would? ', type: 'multiple', group: 'Overall adjustment', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
  { id: 12, text: 'Do you ever think about going back to work part-time?', type: 'multiple', group: 'Overall adjustment', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Definitely Yes'] },
  { id: 13, text: 'Would you say your work created your personal identity?', type: 'multiple', group: 'Overall adjustment', options: ['A Lot', 'Quite a bit', 'Moderately', 'Hardly at all', 'Not At All'] },
  { id: 14, text: 'How important is it for you to have a written plan for life in retirement?', type: 'multiple', group: 'Overall adjustment', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
  { id: 15, text: 'How would you rate your ability to deal with change in your personal life?', type: 'multiple', group: 'Overall adjustment', options: ['Very Poorly',	'Somewhat Poorly', 'Could Do Better', 'Good Enough', 'Very Well'] },

{ id: 16, text: 'What topics are of interest to you? (5 = most interested)', type: 'ranking', group: 'Topics of Interest', options: ['Art', 'Science', 'Politics','Literature','Travel','Photography','Painting','City Life','Language','Music','Cooking','Nature','Food & Wine','Cinema','Performing Arts','World Affairs','Technology','Professional Sports'] },
  { id: 17, text: 'What life topics are of most concern to you? (5 = most concerned)', type: 'ranking', group: 'Life Topics', options: ['Significant Medical Issues', 'Feeling Irrelevant', 'Declining Cognition','Death of a Loved One','No Direction in Life','Significant Other Relationship Failure','Elder Caregiving','Staying in Shape','Not Having any Friends'] }

];

export default questions;
