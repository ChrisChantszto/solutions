import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import './Problem5CorrectVisualization.css';

const Problem5CorrectVisualization = () => {
  const [testNumber, setTestNumber] = useState(12); // 00001100 - has consecutive zeros
  const [step, setStep] = useState(0);

  // Test numbers for demonstration
  const testNumbers = [
    { num: 12, binary: '00001100', desc: '12 (has consecutive 0s)', hasConsecZeros: true },
    { num: 170, binary: '10101010', desc: '170 (no consecutive 0s)', hasConsecZeros: false },
    { num: 15, binary: '00001111', desc: '15 (has consecutive 0s at start)', hasConsecZeros: true },
    { num: 85, binary: '01010101', desc: '85 (no consecutive 0s)', hasConsecZeros: false },
    { num: 192, binary: '11000000', desc: '192 (has consecutive 0s)', hasConsecZeros: true }
  ];

  const resetAnimation = () => {
    setStep(0);
  };

  const nextStep = () => {
    setStep(Math.min(step + 1, 4));
  };

  // Helper functions
  const getBinaryString = (num, bits = 8) => {
    return num.toString(2).padStart(bits, '0');
  };

  const BitBox = ({ bit, position, highlighted = false, comparing = false, resultBit = false }) => (
    <div className={`bit-box ${highlighted ? 'highlighted' : ''} ${comparing ? 'comparing' : ''} ${resultBit ? 'result-bit' : ''}`}>
      <div className="bit">{bit}</div>
      <div className="bit-pos">{position}</div>
    </div>
  );

  // Calculate the operations step by step
  const nInverted = (~testNumber) & 0xFF; // Invert and mask to 8 bits
  const nInvertedShifted = (nInverted >> 1) & 0xFF;
  const andResult = nInverted & nInvertedShifted;
  const finalResult = andResult !== 0;

  return (
    <div className="p5c-container">
      <h2 className="p5c-title">Problem 5 Part (b): Consecutive Zeros WITHOUT Loops</h2>
      
      <div className="card card-green">
        <h3 className="card-title">Challenge: Find Consecutive Zeros Without Loops</h3>
        <p>
          <strong>Goal:</strong> Detect if there are at least two consecutive 0 bits, but without using any loops or recursion.
        </p>
        <p className="muted">
          <strong>Key Insight:</strong> Use the consecutive 1s trick, but on the <em>inverted</em> number!
        </p>
      </div>

      {/* Test number selection */}
      <div className="selector-box">
        <h4 className="selector-title">Test with different numbers:</h4>
        <div className="selector-buttons">
          {testNumbers.map((test, index) => (
            <button
              key={index}
              onClick={() => {
                setTestNumber(test.num);
                resetAnimation();
              }}
              className={`selector-button ${testNumber === test.num ? 'active' : ''}`}
            >
              {test.desc}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button 
          onClick={nextStep}
          disabled={step >= 4}
          className="btn btn-blue"
        >
          <Play size={16} /> Next Step
        </button>
        <button 
          onClick={resetAnimation}
          className="btn btn-gray"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      {/* Solution explanation */}
      <div className="card card-blue">
        <h4 className="card-title">The Clever Solution:</h4>
        <code className="code-block">{'return ((~n) & ((~n) >> 1)) != 0;'}</code>
        <p className="muted" style={{ marginTop: '0.5rem' }}>
          <strong>Idea:</strong> Consecutive 0s in the original number become consecutive 1s in the inverted number!
        </p>
      </div>

      {/* Step-by-step visualization */}
      <div className="steps">
        
        {/* Step 0: Original number */}
        <div className={`step ${step >= 0 ? 'active blue' : ''}`}>
          <h4 className="step-title">Step 0: Original Number</h4>
          <div className="block">
            <div className="operation-step">{`n = ${testNumber} = ${getBinaryString(testNumber)}₂`}</div>
            <div className="bit-row">
              <div className="label">n:</div>
              {getBinaryString(testNumber).split('').map((bit, index) => (
                <BitBox key={`n-${index}`} bit={bit} position={7-index} highlighted={bit === '0'} />
              ))}
            </div>
            <div className="caption">Highlighted: zeros in original number</div>
          </div>
        </div>

        {/* Step 1: Invert the number */}
        {step >= 1 && (
          <div className={`step green`}>
            <h4 className="step-title">Step 1: Invert the Number (~n)</h4>
            <div className="block">
              <div className="operation-step">{`~n = ~${testNumber} = ${nInverted} = ${getBinaryString(nInverted)}₂`}</div>
              <div className="stack">
                <div className="bit-row">
                  <div className="label w12">n:</div>
                  {getBinaryString(testNumber).split('').map((bit, index) => (
                    <BitBox key={`orig-${index}`} bit={bit} position={7-index} />
                  ))}
                </div>
                <div className="bit-row">
                  <div className="label w12">~n:</div>
                  {getBinaryString(nInverted).split('').map((bit, index) => (
                    <BitBox key={`inv-${index}`} bit={bit} position={7-index} highlighted={bit === '1'} />
                  ))}
                </div>
              </div>
              <div className="caption">Now consecutive 0s in original became consecutive 1s in inverted!</div>
            </div>
          </div>
        )}

        {/* Step 2: Shift inverted number */}
        {step >= 2 && (
          <div className={`step purple`}>
            <h4 className="step-title">{'Step 2: Shift Inverted Number ((~n) >> 1)'}</h4>
            <div className="block">
              <div className="operation-step">{`(~n) >> 1 = ${nInverted} >> 1 = ${nInvertedShifted} = ${getBinaryString(nInvertedShifted)}₂`}</div>
              <div className="stack">
                <div className="bit-row">
                  <div className="label w12">~n:</div>
                  {getBinaryString(nInverted).split('').map((bit, index) => (
                    <BitBox key={`inv2-${index}`} bit={bit} position={7-index} />
                  ))}
                </div>
                <div className="bit-row">
                  <div className="label w12">{'(~n) >> 1:'}</div>
                  {getBinaryString(nInvertedShifted).split('').map((bit, index) => (
                    <BitBox key={`shift-${index}`} bit={bit} position={7-index} comparing={true} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: AND operation */}
        {step >= 3 && (
          <div className={`step red`}>
            <h4 className="step-title">{'Step 3: AND Operation ((~n) & ((~n) >> 1))'}</h4>
            <div className="block">
              <div className="operation-step">{`(~n) & ((~n) >> 1) = ${nInverted} & ${nInvertedShifted} = ${andResult} = ${getBinaryString(andResult)}₂`}</div>
              <div className="stack">
                <div className="bit-row">
                  <div className="label w12">~n:</div>
                  {getBinaryString(nInverted).split('').map((bit, index) => (
                    <BitBox key={`and1-${index}`} bit={bit} position={7-index} />
                  ))}
                </div>
                <div className="bit-row">
                  <div className="label w12">{'(~n) >> 1:'}</div>
                  {getBinaryString(nInvertedShifted).split('').map((bit, index) => (
                    <BitBox key={`and2-${index}`} bit={bit} position={7-index} />
                  ))}
                </div>
                <div className="bit-row">
                  <div className="label w12">AND:</div>
                  {getBinaryString(andResult).split('').map((bit, index) => (
                    <BitBox key={`result-${index}`} bit={bit} position={7-index} resultBit={bit === '1'} />
                  ))}
                </div>
              </div>
              <div className="caption">1s in result indicate where consecutive 1s existed in inverted number (= consecutive 0s in original)</div>
            </div>
          </div>
        )}

        {/* Step 4: Final check */}
        {step >= 4 && (
          <div className={`step orange`}>
            <h4 className="step-title">Step 4: Final Check (result != 0)</h4>
            <div className="final">
              <div className="operation-step">AND result: <strong>{andResult}</strong></div>
              <div className="operation-step">Is result != 0? <strong>{finalResult ? 'YES' : 'NO'}</strong></div>
              <div className={`final-banner ${finalResult ? 'ok' : 'bad'}`}>
                <strong>CONCLUSION:</strong> {finalResult ? 'The number HAS consecutive zeros!' : 'The number has NO consecutive zeros.'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Why this works */}
      <div className="card card-yellow">
        <h4 className="card-title">Why This Trick Works:</h4>
        <div className="inline-grid small">
          <div>
            <strong>Key Insight:</strong> We can reuse the consecutive 1s detection algorithm by first inverting the number!
          </div>
          <div>
            <strong>Step-by-step logic:</strong>
            <ol className="list">
              <li>Consecutive 0s in original number become consecutive 1s after inversion</li>
              <li>Use the same (n &amp; (n &gt;&gt; 1)) trick on the inverted number</li>
              <li>If result ≠ 0, there were consecutive 1s in inverted = consecutive 0s in original</li>
            </ol>
          </div>
          <div className="card card-white">
            <strong>Complete solution:</strong>
            <code className="code-block" style={{ marginTop: '0.25rem' }}>{'return ((~n) & ((~n) >> 1)) != 0;'}</code>
          </div>
        </div>
      </div>

      {/* Examples comparison */}
      <div className="card card-gray">
        <h4 className="card-title">Quick Examples:</h4>
        <div className="examples">
          <div className="example-card">
            <div className="example-title">12 = 00001100 (has consecutive 0s)</div>
            <div className="mono small">
              <div>{'~n:           11110011'}</div>
              <div>{'(~n) >> 1:   01111001'}</div>
              <div>{'AND:          01110001 ≠ 0'}</div>
            </div>
            <div className="good">✓ Has consecutive 0s</div>
          </div>
          <div className="example-card">
            <div className="example-title">170 = 10101010 (no consecutive 0s)</div>
            <div className="mono small">
              <div>{'~n:           01010101'}</div>
              <div>{'(~n) >> 1:   00101010'}</div>
              <div>{'AND:          00000000 = 0'}</div>
            </div>
            <div className="bad">✗ No consecutive 0s</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem5CorrectVisualization;
