import 'dotenv/config';
import axios from 'axios';

/**
 * @typedef {Object} Message
 * @property {string} role - The role of the message sender (e.g., 'user', 'assistant')
 * @property {string} content - The content of the message
 */

/**
 * Tests the chatbot API endpoint
 * @returns {Promise<void>}
 */
async function testChatbot() {
    try {
        const response = await axios.post(
            'http://localhost:3001/api/chat',
            {
                messages: [
                    {
                        role: 'user',
                        content: 'Hello, can you help me draft an email?'
                    }
                ],
                accountId: 'test-account-123' // You might need to adjust this
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                    // Removed Authorization header for testing with public route
                },
                responseType: 'stream'
            }
        );

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        // Stream the response
        // Process the streaming response
        response.data.on('data', (/** @type {Buffer} */ chunk) => {
            try {
                const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.replace('data: ', '').trim();
                        if (data === '[DONE]') {
                            console.log('\n\n--- Stream completed ---');
                            return;
                        }
                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.choices?.[0]?.delta?.content) {
                                process.stdout.write(parsed.choices[0].delta.content);
                            }
                        } catch (e) {
                            console.error('\nError parsing chunk:', e);
                        }
                    }
                }
            } catch (e) {
                console.error('\nError processing chunk:', e);
            }
        });
        
        response.data.on('end', () => {
            console.log('Stream ended');
        });
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error testing chatbot:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                message: error.message
            });
        } else if (error instanceof Error) {
            console.error('Error testing chatbot:', error.message);
            console.error(error.stack);
        } else {
            console.error('Unknown error testing chatbot:', error);
        }
    }
}

testChatbot();
