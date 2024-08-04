import { getAIResponse } from './app/apiClient';

const userProfile = {
  name: 'Taro',
  relationshipDuration: '2 years 3 months',
  mood: 'happy',
};

getAIResponse(userProfile)
  .then((response: string) => {
    console.log(`AI Response: ${response}`);
  })
  .catch((error: any) => {
    console.error('Error fetching AI response:', error);
  });
