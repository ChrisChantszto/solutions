import React, { useState } from 'react';
import { Info } from 'lucide-react';
import './Problem3Explanation.css';

const Problem3Explanation = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const MemoryBox = ({ value, address, label, highlighted = false, size = "w-12" }) => (
    <div className={`${size} memory-block ${highlighted ? 'highlighted' : ''}`}>
      <div className="address">{address}</div>
      <div className="value">{value}</div>
      {label && <div className="label">{label}</div>}
    </div>
  );

  const steps = [
    {
      title: "Step 1: Understanding the_other",
      explanation: "the_other is a pointer to int, pointing to heap memory allocated with malloc(12)",
      code: "int *the_other = malloc(12);"
    },
    {
      title: "Step 2: Setting the_other[0]",
      explanation: "We store 51 in the first int (4 bytes)",
      code: "the_other[0] = 51;"
    },
    {
      title: "Step 3: Cast to char* for byte-level access",
      explanation: "(char *)the_other treats the memory as individual bytes instead of 4-byte ints",
      code: "(char *)the_other"
    },
    {
      title: "Step 4: Add 4 bytes",
      explanation: "Adding 4 moves us 4 bytes forward, pointing to the second int location",
      code: "(char *)the_other + 4"
    },
    {
      title: "Step 5: Cast back to int* and dereference",
      explanation: "Cast back to int* and use * to store 85 at that location",
      code: "*(int *)((char *)the_other + 4) = 85;"
    }
  ];

  return (
    <div className="problem3-container">
      <h2 className="problem3-title">Problem 3: Understanding Pointers Casting</h2>
      
      <div className="tip-box">
        <div className="tip-header">
          <Info size={20} />
          <span>The Confusing Line:</span>
        </div>
        <code className="code-block-lg">
          *(int *)((char *)the_other + 4) = 85;
        </code>
      </div>

      {/* Step Navigation */}
      <div className="step-nav">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`step-btn ${currentStep === index ? 'active' : ''}`}
          >
            Step {index + 1}
          </button>
        ))}
      </div>

      {/* Current Step Display */}
      <div className="current-step">
        <h3>{steps[currentStep].title}</h3>
        <p>{steps[currentStep].explanation}</p>
        <code className="code-block-lg">{steps[currentStep].code}</code>
      </div>

      {/* Memory Visualization */}
      <div className="visualization-grid">
        
        {/* Memory Layout */}
        <div className="memory-section">
          <h4 className="section-title">HEAP Memory Layout</h4>
          <div className="memory-label">malloc(12) allocates 12 bytes:</div>
          
          {/* Byte-level view */}
          <div>
            <div className="address">Byte-level view:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {Array.from({length: 12}, (_, i) => (
                <MemoryBox
                  key={i}
                  value={
                    currentStep >= 1 && i < 4 ? (i === 0 ? "51" : i === 1 ? "0" : i === 2 ? "0" : "0") :
                    currentStep >= 4 && i >= 4 && i < 8 ? (i === 4 ? "85" : i === 5 ? "0" : i === 6 ? "0" : "0") :
                    ""
                  }
                  address={`+${i}`}
                  highlighted={
                    (currentStep === 2 && i < 4) ||
                    (currentStep === 3 && i < 4) ||
                    (currentStep === 4 && i === 4)
                  }
                  size="w-10"
                />
              ))}
            </div>
          </div>

          {/* Int-level view */}
          <div>
            <div className="address">Int-level view (4 bytes each):</div>
            <div style={{ display: 'flex' }}>
              <MemoryBox
                value={currentStep >= 1 ? "51" : ""}
                address="int[0]"
                label="the_other[0]"
                highlighted={currentStep === 1}
                size="w-20"
              />
              <MemoryBox
                value={currentStep >= 4 ? "85" : ""}
                address="int[1]"
                label="the_other[1]"
                highlighted={currentStep >= 4}
                size="w-20"
              />
              <MemoryBox
                value=""
                address="int[2]"
                label="the_other[2]"
                size="w-20"
              />
            </div>
          </div>
        </div>

        {/* Step-by-Step Breakdown */}
        <div className="column">
          <h4 className="section-title">Why All The Casting?</h4>
          
          <div className="column">
            <div className={`info-card ${currentStep >= 0 ? 'active' : ''}`}>
              <div><strong>1. the_other is int*</strong></div>
              <div className="address">Points to 4-byte integers</div>
              <code className="value">the_other[0], the_other[1], the_other[2]</code>
            </div>

            <div className={`info-card ${currentStep >= 2 ? 'active' : ''}`}>
              <div><strong>2. Cast to char*</strong></div>
              <div className="address">Now treats memory as individual bytes</div>
              <code className="value">(char *)the_other</code>
            </div>

            <div className={`info-card ${currentStep >= 3 ? 'active' : ''}`}>
              <div><strong>3. Add 4 bytes</strong></div>
              <div className="address">Move 4 bytes forward (skipping first int)</div>
              <code className="value">(char *)the_other + 4</code>
            </div>

            <div className={`info-card ${currentStep >= 4 ? 'active' : ''}`}>
              <div><strong>4. Cast back to int*</strong></div>
              <div className="address">Interpret that byte location as an int pointer</div>
              <code className="value">(int *)((char *)the_other + 4)</code>
            </div>

            <div className={`info-card ${currentStep >= 4 ? 'active' : ''}`}>
              <div><strong>5. Dereference and assign</strong></div>
              <div className="address">Store 85 at that location</div>
              <code className="value">*(int *)((char *)the_other + 4) = 85</code>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="comparison">
        <h4 className="section-title">Why Not Just Use the_other[1] = 85?</h4>
        <div className="comparison-grid">
          <div className="comparison-card green">
            <div><strong>Simple Way:</strong></div>
            <code className="value" style={{ display: 'block', marginTop: '0.5rem' }}>the_other[1] = 85;</code>
            <div className="address" style={{ marginTop: '0.25rem' }}>This would work exactly the same!</div>
          </div>
          <div className="comparison-card blue">
            <div><strong>Complex Way (in the problem):</strong></div>
            <code className="value" style={{ display: 'block', marginTop: '0.5rem' }}>*(int *)((char *)the_other + 4) = 85;</code>
            <div className="address" style={{ marginTop: '0.25rem' }}>Tests your understanding of pointer arithmetic and casting</div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="key-insights">
        <h4>Key Insights:</h4>
        <ul>
          <li>• <strong>int*</strong> arithmetic moves by 4 bytes (sizeof(int))</li>
          <li>• <strong>char*</strong> arithmetic moves by 1 byte (sizeof(char))</li>
          <li>• Casting lets you reinterpret the same memory address differently</li>
          <li>• The complex casting is equivalent to <code>the_other[1] = 85</code></li>
        </ul>
      </div>
    </div>
  );
}

export default Problem3Explanation;
