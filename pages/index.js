import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
const Home = () => {
  const [userInput, setUserInput] = useState('');
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  return (
    <div className="root">
      <Head>
        <title>Smart Contract | Audit</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>AI smart contract audit</h1>
          </div>
          <div className="header-subtitle">
            <h2> Disclaimer:
This security audit is not designed to replace functional tests required before any software
release, and does not give any warranties on finding all possible security issues of the given smart
contract(s) or blockchain software, i.e., the evaluation result does not guarantee the nonexistence
of any further findings of security issues. As one audit-based assessment cannot be considered
comprehensive, we always recommend proceeding with several independent audits and a public bug
bounty program to ensure the security of smart contract(s). Last but not least, this security audit
should not be used as investment advice.</h2>
          </div>
        </div>
       <div className="prompt-container">
          <textarea placeholder="copy and paste your code here for an instant audit of your smart contract" className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />; 
        <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>
    {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}

        </div>
      </div>
      <div className="badge-container grow">
        <a
          href=""
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>MR FIXIT</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;