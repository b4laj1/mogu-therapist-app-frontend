const API_URL = 'http://localhost:5000/api/chat';

export const sendMessageToAI = async (message) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Failed to communicate with AI');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error(error);
        return 'Sorry, something went wrong. Please try again later.';
    }
};
