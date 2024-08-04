import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/engines/gpt-4/completions';

interface UserProfile {
  name: string;
  relationshipDuration: string;
  mood: string;
}

export async function getAIResponse(profile: UserProfile): Promise<string> {
  const prompt = `
    User profile:
    - Name: ${profile.name}
    - Relationship duration: ${profile.relationshipDuration}
    - Mood: ${profile.mood}

    Generate a response in 150 characters or less that is satisfying to the user.
  `;

  const response = await axios.post(
    apiUrl,
    {
      prompt: prompt,
      max_tokens: 50,
      temperature: 0.7,
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].text.trim();
}
