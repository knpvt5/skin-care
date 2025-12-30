import { createClient } from '@supabase/supabase-js';

process.loadEnvFile("shopvoraonline/.env")

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Invoke the AI streaming Edge Function
console.log('Attempting to invoke smart-task Edge Function with streaming...\n');

const userPrompt = 'Explain what skincare is in 2 sentences';

console.log(`User Prompt: "${userPrompt}"\n`);
console.log('AI Response (streaming):');
console.log('----------------------------------------');

try {
    // For streaming responses, we need to use fetch directly
    const response = await fetch(
        `${supabaseUrl}/functions/v1/smart-task`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseAnonKey}`,
            },
            body: JSON.stringify({
                message: userPrompt
            })
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.log('\n❌ Error:', response.status, response.statusText);
        console.log('Error details:', errorText);
    } else if (!response.body) {
        console.log('\n❌ No response body received');
    } else {
        // Stream the response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const text = decoder.decode(value, { stream: true });
            process.stdout.write(text); 
        }
        
        console.log('\n----------------------------------------');
        console.log('\n✅ Streaming completed successfully!');
    }
} catch (error) {
    console.log('\n❌ Error:', error.message);
}
