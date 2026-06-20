const { GoogleGenerativeAI } = require('@google/generative-ai');

// System context that defines the AI's knowledge and personality
const SYSTEM_PROMPT = `
You are the official virtual assistant for "AI Solutions", a premium technology agency based in Kathmandu, Nepal.
Your tone should be professional, extremely helpful, friendly, and human-like. 
Keep responses concise, usually 1-3 sentences, unless asked for details.

Core Details about AI Solutions:
- Services: We specialize in Web Applications, Mobile Applications, Custom AI Solutions, Cloud Architecture, and Enterprise Systems.
- Pricing/Costs: 
  * Web Applications: Starting from $2000.
  * Mobile Applications (iOS/Android): Starting from $5000.
  * Custom AI Integrations: We provide custom quotes after a free consultation.
- Contact: Users can reach out via the Contact Page to hire us or schedule a meeting.
- Projects: We have built E-Commerce apps, Healthcare Portals, Smart City Dashboards, and FinTech Wallets (found in our Portfolio).
- Address: Kathmandu, Nepal.

If a user asks about something outside of our services, politely steer the conversation back to how AI Solutions can help them with technology.
`;

// A smart fallback if the Gemini API key is missing
const generateMockResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('cost') || lowerMsg.includes('price') || lowerMsg.includes('pricing') || lowerMsg.includes('how much')) {
    return "Our Web Applications start at $2,000, and Mobile Applications begin at $5,000. For custom AI integrations or enterprise systems, we provide tailored quotes after a free consultation. Would you like to schedule one?";
  }
  if (lowerMsg.includes('service') || lowerMsg.includes('offer') || lowerMsg.includes('what do you do')) {
    return "At AI Solutions, we specialize in high-end Web Development, Mobile Apps, Cloud Architecture, and custom AI Integrations. We build scalable systems for startups and enterprises alike!";
  }
  if (lowerMsg.includes('where') || lowerMsg.includes('location') || lowerMsg.includes('based')) {
    return "We are proudly based in Kathmandu, Nepal, but we work with clients globally!";
  }
  if (lowerMsg.includes('contact') || lowerMsg.includes('hire') || lowerMsg.includes('talk')) {
    return "You can easily reach out to our team by navigating to the Contact page. We'd love to hear about your project!";
  }
  if (lowerMsg.includes('portfolio') || lowerMsg.includes('project') || lowerMsg.includes('built')) {
    return "We have built amazing systems including E-Commerce apps, Healthcare Portals, Smart City Dashboards, and FinTech Wallets. Check out our Portfolio page to see live previews!";
  }
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return "Hello there! I'm the AI Solutions assistant. How can I help you grow your business today?";
  }
  
  return "That's an interesting question! While I'm still learning the specifics, our expert engineering team would love to discuss this with you. Feel free to reach out via our Contact page!";
};

// @desc    Handle chat messages
// @route   POST /api/chat
// @access  Public
const handleChat = async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  // Check if GEMINI API KEY exists
  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      // Use gemini-1.5-flash as it is fast and cost-effective
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Format history for Gemini
      const formattedHistory = history.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

      // Start chat session with system prompt
      const chat = model.startChat({
        history: formattedHistory,
        systemInstruction: {
          role: 'system',
          parts: [{ text: SYSTEM_PROMPT }]
        }
      });

      const result = await chat.sendMessage([{ text: message }]);
      const response = await result.response;
      const text = response.text();

      return res.json({ reply: text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      // Fallback to mock if API fails (e.g. quota exceeded)
      return res.json({ reply: generateMockResponse(message) });
    }
  } else {
    // Fallback to Smart Mock if no API key is provided
    setTimeout(() => {
      res.json({ reply: generateMockResponse(message) });
    }, 1000); // simulate network delay
  }
};

module.exports = {
  handleChat
};
