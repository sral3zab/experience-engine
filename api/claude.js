// Vercel Edge Function — proxy to Claude API
// Edge Runtime supports streaming and has up to 5 minutes timeout

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured in Vercel environment variables' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  try {
    const body = await request.json();

    // Use streaming to handle longer responses smoothly
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: body.max_tokens || 3000,
        system: body.system,
        messages: body.messages,
        stream: true,
      }),
    });

    if (!claudeResponse.ok) {
      const errText = await claudeResponse.text();
      return new Response(JSON.stringify({ error: 'Claude API error', details: errText }), {
        status: claudeResponse.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Read the SSE stream and accumulate the full text
    const reader = claudeResponse.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6).trim();
          if (!dataStr || dataStr === '[DONE]') continue;
          try {
            const event = JSON.parse(dataStr);
            if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
              fullText += event.delta.text;
            }
          } catch (e) {}
        }
      }
    }

    // Return in the format the app expects
    const result = {
      content: [{ type: 'text', text: fullText }],
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
