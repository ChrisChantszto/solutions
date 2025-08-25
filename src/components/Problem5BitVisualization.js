import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import './Problem5BitVisualization.css';

const Problem5BitVisualization = () => {
  const [currentPart, setCurrentPart] = useState('a');
  const [step, setStep] = useState(0);
  const [testNumber, setTestNumber] = useState(12); // 1100 in binary
  const [currentI, setCurrentI] = useState(7);

  // Test numbers for demonstration
  const testNumbers = [
    { num: 12, binary: '00001100', desc: '12 (has consecutive 1s)' },
    { num: 10, binary: '00001010', desc: '10 (no consecutive 1s)' },
    { num: 15, binary: '00001111', desc: '15 (all consecutive 1s)' },
    { num: 5, binary: '00000101', desc: '5 (no consecutive 1s)' }
  ];

  const resetAnimation = () => {
    setStep(0);
    setCurrentI(7);
  };

  const nextStep = () => {
    if (currentPart === 'a') {
      if (currentI >= 0) {
        setCurrentI(currentI - 1);
        setStep(step + 1);
      }
    } else {
      setStep(step + 1);
    }
  };

  // Helper functions
  const getBit = (num, pos) => (num >> pos) & 1;
  const getBinaryString = (num, bits = 8) => {
    return num.toString(2).padStart(bits, '0');
  };

  const BitBox = ({ bit, position, highlighted = false, comparing = false, label = "" }) => (
    <div className={`bit-box ${highlighted ? 'highlighted' : ''} ${comparing ? 'comparing' : ''}`}>
      <div className="bit">{bit}</div>
      <div className="bit-pos">{position}</div>
      {label && <div className="bit-label">{label}</div>}
    </div>
  );

  const OperationBox = ({ operation, result, step, active = false }) => (
    <div className={`operation-box ${active ? 'active' : ''}`}>
      <div className="operation-op">{operation}</div>
      <div className="operation-step">Step {step}: {result}</div>
    </div>
  );

  return (
    <div className="problem5-container">
      <h2 className="problem5-title">Problem 5: Bit Manipulation</h2>
      
      {/* Part Selection */}
      <div className="part-nav">
        <button
          onClick={() => setCurrentPart('a')}
          className={`part-btn ${currentPart === 'a' ? 'active-a' : ''}`}
        >
          Part (a): Check Consecutive Zeros
        </button>
        <button
          onClick={() => setCurrentPart('b')}
          className={`part-btn ${currentPart === 'b' ? 'active-b' : ''}`}
        >
          Part (b): Check Consecutive Ones
        </button>
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

      {currentPart === 'a' && (
        <div className="inline-grid">
          <div className="card card-blue">
            <h3 className="card-title">Part (a): Finding Two Consecutive Zeros</h3>
            <p>
              <strong>Goal:</strong> Return true if there are two consecutive 0 bits in the number.
            </p>
            <code className="operation-op" style={{ display: 'block', marginTop: '0.5rem' }}>
              {'if (((n >> i) & 1) == 0 && ((n >> (i + 1)) & 1) == 0)'}
            </code>
          </div>

          {/* Controls */}
          <div className="controls">
            <button 
              onClick={nextStep}
              disabled={currentI < 0}
              className="btn btn-blue"
            >
              <Play size={16} /> Check Next Position
            </button>
            <button 
              onClick={resetAnimation}
              className="btn btn-gray"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>

          {/* Current state */}
          <div className="card card-yellow">
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Testing number:</strong> {testNumber} = {getBinaryString(testNumber)}₂
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Current position i:</strong> {currentI >= 0 ? currentI : 'Done'}
            </div>
            {currentI >= 0 && (
              <div className="operation-step">
                Checking positions {currentI} and {currentI + 1} for consecutive zeros
              </div>
            )}
          </div>

          {/* Binary representation */}
          <div className="section">
            <h4 className="section-title">Binary Representation Analysis</h4>
            
            {/* Original number */}
            <div style={{ marginBottom: '1rem' }}>
              <div className="operation-step" style={{ marginBottom: '0.5rem' }}>n = {testNumber} = {getBinaryString(testNumber)}₂</div>
              <div className="bit-row">
                {getBinaryString(testNumber).split('').map((bit, index) => {
                  const position = 7 - index;
                  return (
                    <BitBox
                      key={position}
                      bit={bit}
                      position={position}
                      highlighted={currentI >= 0 && (position === currentI || position === currentI + 1)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Bit operations breakdown */}
            {currentI >= 0 && (
              <div className="operations">
                {/* First bit check */}
                <div className="operation-box card-white">
                  <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Check bit at position {currentI}:</h5>
                  <div className="operation-op">
                    <OperationBox 
                      operation={`n >> ${currentI}`}
                      result={`${testNumber} >> ${currentI} = ${testNumber >> currentI} = ${getBinaryString(testNumber >> currentI)}`}
                      step="1"
                      active={true}
                    />
                    <OperationBox 
                      operation={`(${testNumber >> currentI}) & 1`}
                      result={`${getBinaryString(testNumber >> currentI)} & 00000001 = ${(testNumber >> currentI) & 1}`}
                      step="2"
                      active={true}
                    />
                    <div className={`card ${getBit(testNumber, currentI) === 0 ? 'card-green' : 'card-red'}`}>
                      Bit {currentI} is: <strong>{getBit(testNumber, currentI)}</strong>
                    </div>
                  </div>
                </div>

                {/* Second bit check */}
                {currentI < 7 && (
                  <div className="operation-box card-white">
                    <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Check bit at position {currentI + 1}:</h5>
                    <div className="operation-op">
                      <OperationBox 
                        operation={`n >> ${currentI + 1}`}
                        result={`${testNumber} >> ${currentI + 1} = ${testNumber >> (currentI + 1)} = ${getBinaryString(testNumber >> (currentI + 1))}`}
                        step="3"
                        active={true}
                      />
                      <OperationBox 
                        operation={`(${testNumber >> (currentI + 1)}) & 1`}
                        result={`${getBinaryString(testNumber >> (currentI + 1))} & 00000001 = ${(testNumber >> (currentI + 1)) & 1}`}
                        step="4"
                        active={true}
                      />
                      <div className={`card ${getBit(testNumber, currentI + 1) === 0 ? 'card-green' : 'card-red'}`}>
                        Bit {currentI + 1} is: <strong>{getBit(testNumber, currentI + 1)}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Result */}
                {currentI < 7 && (
                  <div className="result">
                    <div className="title">Final Check:</div>
                    <div className="operation-step">
                      <div>Bit {currentI} == 0? <strong>{getBit(testNumber, currentI) === 0 ? 'YES' : 'NO'}</strong></div>
                      <div>Bit {currentI + 1} == 0? <strong>{getBit(testNumber, currentI + 1) === 0 ? 'YES' : 'NO'}</strong></div>
                      <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                        Both zeros? {getBit(testNumber, currentI) === 0 && getBit(testNumber, currentI + 1) === 0 ? 
                        <span style={{ color: '#047857' }}>YES - FOUND CONSECUTIVE ZEROS!</span> : 
                        <span style={{ color: '#b91c1c' }}>NO - Continue searching</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {currentPart === 'b' && (
        <div className="inline-grid">
          <div className="card card-green">
            <h3 className="card-title">Part (b): Finding Consecutive Ones</h3>
            <p>
              <strong>Goal:</strong> Return true if there are consecutive 1 bits in the number.
            </p>
            <code className="operation-op" style={{ display: 'block', marginTop: '0.5rem' }}>
              {'(n & (n >> 1)) != n'}
            </code>
            <p className="operation-step" style={{ marginTop: '0.5rem' }}>This is a clever bit trick!</p>
          </div>

          {/* Step-by-step breakdown */}
          <div className="inline-grid">
            {/* Original number */}
            <div className="section">
              <h4 className="section-title">Step-by-Step Analysis</h4>
              
              <div style={{ marginBottom: '1rem' }}>
                <div className="operation-step" style={{ marginBottom: '0.5rem' }}>{`Testing: n = ${testNumber} = ${getBinaryString(testNumber)}₂`}</div>
                <div className="bit-row">
                  <div style={{ marginRight: '1rem' }} className="operation-step">n:</div>
                  {getBinaryString(testNumber).split('').map((bit, index) => (
                    <BitBox key={`n-${index}`} bit={bit} position={7-index} />
                  ))}
                </div>
              </div>

              {/* Step 1: n >> 1 */}
              <div style={{ marginBottom: '1rem' }}>
                <div className="operation-step" style={{ marginBottom: '0.5rem' }}>{'Step 1: n >> 1 (shift right by 1)'}</div>
                <div className="bit-row">
                  <div style={{ marginRight: '1rem' }} className="operation-step">{'n >> 1:'}</div>
                  {getBinaryString(testNumber >> 1).split('').map((bit, index) => (
                    <BitBox key={`shift-${index}`} bit={bit} position={7-index} comparing={true} />
                  ))}
                </div>
                <div className="operation-step" style={{ marginTop: '0.5rem' }}>
                  Each bit moves one position to the right, 0 fills leftmost position
                </div>
              </div>

              {/* Step 2: AND operation */}
              <div style={{ marginBottom: '1rem' }}>
                <div className="operation-step" style={{ marginBottom: '0.5rem' }}>{'Step 2: n & (n >> 1) (bitwise AND)'}</div>
                <div className="inline-grid">
                  <div className="bit-row">
                    <div style={{ marginRight: '1rem' }} className="operation-step">n:</div>
                    {getBinaryString(testNumber).split('').map((bit, index) => (
                      <BitBox key={`and1-${index}`} bit={bit} position={7-index} />
                    ))}
                  </div>
                  <div className="bit-row">
                    <div style={{ marginRight: '1rem' }} className="operation-step">{'n >> 1:'}</div>
                    {getBinaryString(testNumber >> 1).split('').map((bit, index) => (
                      <BitBox key={`and2-${index}`} bit={bit} position={7-index} />
                    ))}
                  </div>
                  <div className="bit-row">
                    <div style={{ marginRight: '1rem' }} className="operation-step">AND:</div>
                    {getBinaryString(testNumber & (testNumber >> 1)).split('').map((bit, index) => (
                      <BitBox key={`result-${index}`} bit={bit} position={7-index} highlighted={bit === '1'} />
                    ))}
                  </div>
                </div>
                <div className="operation-step" style={{ marginTop: '0.5rem' }}>
                  Result: {testNumber & (testNumber >> 1)} = {getBinaryString(testNumber & (testNumber >> 1))}₂
                </div>
              </div>

              {/* Step 3: Comparison */}
              <div className="card card-purple">
                <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Step 3: Compare (n & (n >> 1)) with n</h5>
                <div className="inline-grid" style={{ gap: '0.5rem' }}>
                  <div>Original n: <strong>{testNumber}</strong></div>
                  <div>{'n & (n >> 1):'} <strong>{testNumber & (testNumber >> 1)}</strong></div>
                  <div>Are they different? <strong>{(testNumber & (testNumber >> 1)) !== testNumber ? 'YES' : 'NO'}</strong></div>
                  <div className="card card-white">
                    <strong>Result:</strong> {(testNumber & (testNumber >> 1)) !== testNumber ? 
                    <span style={{ color: '#047857' }}>HAS consecutive 1s</span> : 
                    <span style={{ color: '#b91c1c' }}>NO consecutive 1s</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation of the trick */}
            <div className="card card-blue">
              <h4 className="card-title">Why This Trick Works:</h4>
              <div className="inline-grid">
                <div>
                  <strong>Key Insight:</strong> When you AND a number with itself shifted right by 1, 
                  you get 1s only where there are consecutive 1s in the original number.
                </div>
                <div className="inline-grid">
                  <div className="card card-white">
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Example: 1100 (has consecutive 1s)</div>
                    <div className="operation-op" style={{ display: 'grid', gap: '0.25rem' }}>
                      <div>{'n:     1100'}</div>
                      <div>{'n >> 1:  0110'}</div>
                      <div>{'AND:   0100'}</div>
                    </div>
                    <div className="operation-step" style={{ marginTop: '0.5rem' }}>Result ≠ original → consecutive 1s found</div>
                  </div>
                  <div className="card card-white">
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Example: 1010 (no consecutive 1s)</div>
                    <div className="operation-op" style={{ display: 'grid', gap: '0.25rem' }}>
                      <div>{'n:     1010'}</div>
                      <div>{'n >> 1:  0101'}</div>
                      <div>{'AND:   0000'}</div>
                    </div>
                    <div className="operation-step" style={{ marginTop: '0.5rem' }}>Result ≠ original → no consecutive 1s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="summary">
        <h4 className="section-title">Key Concepts:</h4>
        <div className="summary-grid">
          <div>
            <h5>Part (a) - Consecutive Zeros:</h5>
            <ul>
              <li>• <strong>(n >> i) & 1</strong>: Extract bit at position i</li>
              <li>• Check two adjacent positions for both being 0</li>
              <li>• Loop through all positions to find any consecutive zeros</li>
            </ul>
          </div>
          <div>
            <h5>Part (b) - Consecutive Ones:</h5>
            <ul>
              <li>• <strong>n & (n >> 1)</strong>: Clever bit manipulation trick</li>
              <li>• Highlights positions where consecutive 1s exist</li>
              <li>• Single operation instead of loop - much more efficient!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem5BitVisualization;
