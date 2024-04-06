// This is a slack backend code needed for verification stage , implemented using cf worker

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {
    // return new Response('Hello World!');
    if (request.method === 'POST') {
      // Attempt to parse the JSON body
      const requestBody = await request.json();
      console.log(requestBody)
  
      // Check for URL verification challenge
      if (requestBody.type === 'url_verification' && requestBody.challenge) {
        console.log("necessary params found");
        // Respond with the challenge JSON object
        return new Response(JSON.stringify({ challenge: requestBody.challenge }), {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 200,
        });
      } else {
        // Handle other events or commands
        return new Response('Expected URL verification request', { status: 400 });
      }
    } else {
      // Not a POST request
      return new Response('Expected POST', { status: 405 });
    }

  },
};
