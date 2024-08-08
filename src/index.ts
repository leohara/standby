import { getAIResponse } from './app/apiClient.js';

const userProfile = {
  name: 'Taro',
  relationshipDuration: '2 years 3 months',
  mood: 'happy',
};

getAIResponse(userProfile)
  .then(response => {
    console.log(`AI Response: ${response}`);
  })
  .catch(error => {
    console.error('Error fetching AI response:', error);
  });
