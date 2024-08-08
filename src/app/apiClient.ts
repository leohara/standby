import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'http://localhost:3000/api/chat';

interface UserProfile {
  name: string;
  relationshipDuration: string;
  mood: string;
}

interface OpenAIResponse {
  choices: { text: string }[];
}

export async function getAIResponse(profile: UserProfile): Promise<string> {
  const prompt = `
    User profile:
    - Name: ${profile.name}
    - Relationship duration: ${profile.relationshipDuration}
    - Mood: ${profile.mood}

    Generate a response in 150 characters or less that is satisfying to the user.
  `;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 50,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json() as OpenAIResponse;
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
