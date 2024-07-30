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
    { id: 18, text: 'How important is your social life to you?', type: 'multiple', group: 'Social Activities', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    { id: 19, text: 'How many interactions with other social groups (ie. book club, sports fan group, volunteer association) do you have on a monthly basis?', type: 'multiple', group: 'Social Activities', options: ['Less Than 2', '2-3', '4-5', '5-6', 'More Than 7'] },
    { id: 20, text: 'Are you interested in reconnecting with old friends or making new ones?', type: 'multiple', group: 'Social Activities', options: ['Not At All', 'Not Really', 'It Depends', 'A Little Bit','Very Much So'] },
    { id: 21, text: 'How many friends or family members do you interact with on a weekly basis?', type: 'multiple', group: 'Social Activities', options: ['Less Than 2', '2-3', '4-5', '5-6', 'More Than 7'] },

//   //  Relationships:
    { id: 22, text: 'How has retirement affected your relationship with your spouse or partner?', type: 'multiple', group: 'Relationships', options: ['Very Negatively', 'Somewhat Negatively',	'Not at all', 'Somewhat positively', 'Very Positively'] },
    { id: 23, text: 'How important is it for you to stay connected with friends and loved ones?', type: 'multiple', group: 'Relationships', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    { id: 24, text: 'How satisfied are you with your relationships with friends?', type: 'multiple', group: 'Relationships', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    { id: 25, text: 'How satisfied are you with your relationships with family?', type: 'multiple', group: 'Relationships', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    { id: 26, text: 'How difficult is it for you to balance personal time with family time?', type: 'multiple', group: 'Relationships', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    { id: 27, text: 'I feel I receive enough emotional support from family and friends.', type: 'multiple', group: 'Relationships', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    { id: 28, text: 'If applicable, how stressful are your current caregiving challenges?', type: 'multiple', group: 'Relationships', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },

//    //  Community Engagement:
    { id: 29, text: 'Are you interested in making a difference in your community?', type: 'multiple', group: 'Community Engagement', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    { id: 30, text: 'Do you volunteer or participate in community service?', type: 'multiple', group: 'Community Engagement', options: ['Never','Rarely','Only If Asked','Often','Always'] },
    { id: 31, text: 'How important is it for you to have close neighbors, friends, or a community that you’re a part of?', type: 'multiple', group: 'Community Engagement', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    { id: 32, text: 'Do you have any aspirations to mentor or guide others?', type: 'multiple', group: 'Community Engagement', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    { id: 33, text: 'How important is it for you to leave a legacy in some way?', type: 'multiple', group: 'Community Engagement', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    { id: 34, text: 'How much of your personal identity is a result of your work?', type: 'multiple', group: 'Community Engagement', options: ['A Lot', 'Quite A Bit','Moderately','Hardly At All','Not At All'] },

//    //  Spirituality:
   { id: 35, text: 'How important are spiritual/religious activities in your life?', type: 'multiple', group: 'Spirituality', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
   { id: 36, text: 'How often do you attend religious services?', type: 'multiple', group: 'Spirituality', options: ['Never','Holidays Only','Monthly','Weekly','Almost Daily'] },
   { id: 37, text: 'Do you utilize a core set of beliefs or a value system to guide your daily life?', type: 'multiple', group: 'Spirituality', options: ['Not At All','Rarely','Occasionally','Often','All The Time'] },
   { id: 38, text: 'Are you aware of the term mindfulness and its utilization in the professional and personal world?', type: 'multiple', group: 'Spirituality', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },

//    //  Health:
   { id: 39, text: 'If applicable, how stressful are your current health issues?', type: 'multiple', group: 'Health', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
   { id: 40, text: 'If applicable, what is the highest level of organized sports in which you participated?', type: 'multiple', group: 'Health', options: ['Never','As a child','Teen Years','College/club','Adult'] },
   { id: 41, text: 'On average, how many days per week do you exercise?', type: 'multiple', group: 'Health', options: ['0-2 days', '2-3', '3-4 days', '4-5', '> 5 days'] },
   { id: 42, text: 'How do you feel your normal daily activities are limited by your physical condition?', type: 'multiple', group: 'Health', options: ['Extremely','Very','Moderately','Slightly','Not At All'] },
   { id: 43, text: 'How would you rate your overall level of physical fitness?', type: 'multiple', group: 'Health', options: ['Not At All Fit','Somewhat fit','Moderately Fit','Very Fit','Extremely Fit'] },
   { id: 44, text: 'Has a doctor suggested that you restrict your physical activities in any way?', type: 'multiple', group: 'Health', options: ['Totally Restrictive','Very Restrictive', 'Moderately Restrictive', 'Slightly	Restrictive', 'No Restrictions'] },   
   { id: 45, text: 'What is the hardest physical activity you’ve undertaken in the last five years?', type: 'multiple', group: 'Health', options: ['Grocery Shopping', 'Casual Walking', 'Brisk Walking/Jogging', 'Long Bike Ride', '8-hour Hike Uphill'] },   

//    //  The following questions refer to your past or present work life:
   { id: 46, text: 'How important is, or was, your career/professional life to you?', type: 'multiple', group: 'The following questions refer to your past or present work life:', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
   { id: 47, text: 'How important is, or was it, for to you balance work and family life?', type: 'multiple', group: 'The following questions refer to your past or present work life:', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
   { id: 48, text: 'How important are, or were, work-life boundaries?', type: 'multiple', group: 'The following questions refer to your past or present work life:', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
   { id: 49, text: 'How do, or did you, deal with change in your work world?', type: 'multiple', group: 'The following questions refer to your past or present work life:', options: ['Very Poorly', 'Somewhat Poorly', 'Could Do Better', 'Good Enough', 'Very Well'] },
   { id: 50, text: 'How much does, or did, your job affect your self-esteem or identity?', type: 'multiple', group: 'The following questions refer to your past or present work life:', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
   { id: 51, text: 'Are, or were you, a part of any professional organizations?', type: 'multiple', group: 'The following questions refer to your past or present work life:', options: ['Never', 'A While Back', 'One', 'Yes - A Few', 'Yes – A Lot'] },   
   { id: 52, text: 'To what degree do, or did you, rely on co-workers for personal relationships?', type: 'multiple', group: 'The following questions refer to your past or present work life:', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },   
   //   lifestyle
   { id: 53, text: 'Living a healthy lifestyle?', type: 'multiple', group: 'lifestyle', options: ['Not At All', 'Slightly', 'Moderately', 'Very', 'Extremely'] },


  // Unnumbered ranking questions
  { id: 54, text: 'How would you rate your professional skills (5 = most proficient) in each of the following categories?', type: 'ranking', group: 'Professional Skills', options: ['Financial', 'Managerial', 'Administrative', 'Creative', 'Technical: science', 'Technical: computers/IT', 'Project Management', 'Public Speaking', 'Training & Development', 'Negotiations', 'Customer Service'] },
  { id: 55, text: 'What causes are important to you? (5 = most important)', type: 'ranking', group: 'Causes', options: ['Homelessness', 'Poverty', 'Child Welfare', 'Education', 'Environmental/Conservation','Animal Welfare','Hunger','Literacy','Youth Sports'] },
  { id: 56, text: 'What topics are of interest to you? (5 = most interested)', type: 'ranking', group: 'Topics of Interest', options: ['Art', 'Science', 'Politics','Literature','Travel','Photography','Painting','City Life','Language','Music','Cooking','Nature','Food & Wine','Cinema','Performing Arts','World Affairs','Technology','Professional Sports'] },
  { id: 57, text: 'What life topics are of most concern to you? (5 = most concerned)', type: 'ranking', group: 'Life Topics', options: ['Significant Medical Issues', 'Feeling Irrelevant', 'Declining Cognition','Death of a Loved One','No Direction in Life','Significant Other Relationship Failure','Elder Caregiving','Staying in Shape','Not Having any Friends'] }

];

export default questions;
