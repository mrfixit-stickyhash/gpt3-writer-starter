import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
 apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const generateAction = async (req, res) => {
    const basePromptPrefix = `make an audit report with detailed Findings, summery, suggestions and a Conclusion looking for these types of things:
    Basic Coding Bugs
    Constructor Mismatch
    Ownership Takeover
    Redundant Fallback Function
    Overflows & Underflows
    Reentrancy
    Money-Giving Bug
    Blackhole
    Unauthorized Self-Destruct
    Revert DoS
    Unchecked External Call
    Gasless Send
    Send Instead Of Transfer
    Costly Loop
    (Unsafe) Use Of Untrusted Libraries
    (Unsafe) Use Of Predictable Variables
    Transaction Ordering Dependence
    Deprecated Uses
    Semantic Consistency Checks Semantic Consistency Checks
    Advanced DeFi Scrutiny
    Business Logics Review
    Functionality Checks
    Authentication Management
    Access Control & Authorization
    Oracle Security
    Digital Asset Escrow
    Kill-Switch Mechanism
    Operation Trails & Event Generation
    ERC20 Idiosyncrasies Handling
    Frontend-Contract Integration
    Deployment Consistency
    Holistic Risk Management
    Additional Recommendations
    Avoiding Use of Variadic Byte Array
    Using Fixed Compiler Version
    Making Visibility Level Explicit
    Making Type Inference Explicit
    Adhering To Function Declaration Strictly
    Following Other Best Practices
    
    on this code:`;
    // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}\n`)
 
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;