import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import './CleanUpPtrArrVisualization.css';

const CleanUpPtrArrVisualization = () => {
  const [step, setStep] = useState(0);
  const maxSteps = 4;

  const resetAnimation = () => setStep(0);
  const nextStep = () => setStep(prev => Math.min(prev + 1, maxSteps));

  const MemoryBlock = ({ value, address, color = "blue-block", label, highlighted = false }) => (
    <div className={`memory-block ${color} ${highlighted ? 'highlighted' : ''}`}>
      <div className="address">{address}</div>
      <div className="value">{value}</div>
      {label && <div className="label">{label}</div>}
    </div>
  );

  const getStepDescription = () => {
    switch(step) {
      case 0: return "Initial state: arr[] contains pointers to scattered heap locations";
      case 1: return "malloc() creates contiguous array 'copy'";
      case 2: return "Loop iteration: copy values and free old memory";
      case 3: return "Update pointers to point to new contiguous locations";
      case 4: return "Final state: all pointers now point to contiguous memory";
      default: return "";
    }
  };

  return (
    <div className="visualization-container">
      <h2 className="title">clean_up_ptrarr() Visualization</h2>
      
      <div className="function-signature">
        <h3>Function Signature:</h3>
        <code className="code-block">
          void clean_up_ptrarr(int *arr[], size_t nelems)
        </code>
      </div>

      <div className="controls">
        <button 
          onClick={nextStep} 
          disabled={step >= maxSteps}
          className="next-button"
        >
          <Play size={16} /> Next Step
        </button>
        <button 
          onClick={resetAnimation}
          className="reset-button"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div className="step-description">
        <strong>Step {step}/4:</strong> {getStepDescription()}
      </div>

      <div className="visualization-grid">
        
        {/* BEFORE / DURING */}
        <div className="column">
          <h3 className="column-title">
            {step === 0 ? "BEFORE" : "DURING EXECUTION"}
          </h3>
          
          {/* Stack - arr[] array */}
          <div className="memory-section">
            <h4 className="section-title">STACK</h4>
            <div className="memory-content">
              <div className="memory-label">arr[] (array of pointers):</div>
              <div className="memory-row">
                <MemoryBlock value="ptr→" address="arr[0]" color="yellow-block" />
                <MemoryBlock value="ptr→" address="arr[1]" color="yellow-block" />
                <MemoryBlock value="ptr→" address="arr[2]" color="yellow-block" />
              </div>
              
              {step >= 1 && (
                <div className="memory-group">
                  <div className="memory-label">copy (new pointer):</div>
                  <div className="memory-row">
                    <MemoryBlock 
                      value="ptr→" 
                      address="copy" 
                      color="green-block" 
                      highlighted={step === 1}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Heap - Original scattered memory */}
          <div className="memory-section">
            <h4 className="section-title">HEAP (Original)</h4>
            <div className="memory-content">
              <div className="memory-label">Scattered locations:</div>
              
              <div className="memory-item">
                <span className="address-label">0x1000:</span>
                <MemoryBlock 
                  value="42" 
                  color={step >= 2 ? "red-block" : "blue-block"} 
                  highlighted={step === 2}
                />
                {step >= 2 && <span className="freed-label">freed</span>}
              </div>
              
              <div className="memory-item">
                <span className="address-label">0x2500:</span>
                <MemoryBlock 
                  value="17" 
                  color={step >= 2 ? "red-block" : "blue-block"} 
                  highlighted={step === 2}
                />
                {step >= 2 && <span className="freed-label">freed</span>}
              </div>
              
              <div className="memory-item">
                <span className="address-label">0x3800:</span>
                <MemoryBlock 
                  value="99" 
                  color={step >= 2 ? "red-block" : "blue-block"} 
                  highlighted={step === 2}
                />
                {step >= 2 && <span className="freed-label">freed</span>}
              </div>
            </div>
          </div>

          {/* New contiguous memory */}
          {step >= 1 && (
            <div className="memory-section green-border">
              <h4 className="section-title green-title">HEAP (New Contiguous)</h4>
              <div className="memory-content">
                <div className="memory-label">copy = malloc(3 * sizeof(int)):</div>
                <div className="memory-row">
                  <MemoryBlock 
                    value={step >= 2 ? "42" : ""} 
                    address="copy[0]" 
                    color="green-block"
                    highlighted={step === 2}
                  />
                  <MemoryBlock 
                    value={step >= 2 ? "17" : ""} 
                    address="copy[1]" 
                    color="green-block"
                    highlighted={step === 2}
                  />
                  <MemoryBlock 
                    value={step >= 2 ? "99" : ""} 
                    address="copy[2]" 
                    color="green-block"
                    highlighted={step === 2}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AFTER */}
        <div className="column">
          <h3 className="column-title">AFTER</h3>
          
          {/* Final Stack state */}
          <div className="memory-section">
            <h4 className="section-title">STACK</h4>
            <div className="memory-content">
              <div className="memory-label">arr[] (updated pointers):</div>
              <div className="memory-row">
                <MemoryBlock 
                  value={step >= 3 ? "→copy[0]" : "ptr→"} 
                  address="arr[0]" 
                  color={step >= 3 ? "green-block" : "yellow-block"}
                  highlighted={step === 3}
                />
                <MemoryBlock 
                  value={step >= 3 ? "→copy[1]" : "ptr→"} 
                  address="arr[1]" 
                  color={step >= 3 ? "green-block" : "yellow-block"}
                  highlighted={step === 3}
                />
                <MemoryBlock 
                  value={step >= 3 ? "→copy[2]" : "ptr→"} 
                  address="arr[2]" 
                  color={step >= 3 ? "green-block" : "yellow-block"}
                  highlighted={step === 3}
                />
              </div>
            </div>
          </div>

          {/* Final Heap state */}
          <div className="memory-section green-border">
            <h4 className="section-title green-title">HEAP (Final)</h4>
            <div className="memory-content">
              <div className="memory-label">Contiguous array with same values:</div>
              <div className="memory-row">
                <MemoryBlock 
                  value={step >= 4 ? "42" : step >= 2 ? "42" : ""} 
                  address="copy[0]" 
                  color="green-block"
                  highlighted={step === 4}
                />
                <MemoryBlock 
                  value={step >= 4 ? "17" : step >= 2 ? "17" : ""} 
                  address="copy[1]" 
                  color="green-block"
                  highlighted={step === 4}
                />
                <MemoryBlock 
                  value={step >= 4 ? "99" : step >= 2 ? "99" : ""} 
                  address="copy[2]" 
                  color="green-block"
                  highlighted={step === 4}
                />
              </div>
            </div>
            
            {step >= 4 && (
              <div className="success-message">
                <div className="success-title">✓ Success!</div>
                <div className="success-description">
                  All pointers now point to contiguous memory locations
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code walkthrough */}
      <div className="code-walkthrough">
        <h4 className="walkthrough-title">Code Execution Steps:</h4>
        <div className="code-steps">
          <div className={step >= 1 ? "code-step active" : "code-step inactive"}>
            1. int *copy = malloc(nelems * sizeof(int)); // Allocate contiguous memory
          </div>
          <div className={step >= 2 ? "code-step active" : "code-step inactive"}>
            2. copy[i] = *(arr[i]); // Copy values from scattered locations
          </div>
          <div className={step >= 2 ? "code-step active" : "code-step inactive"}>
            3. free(arr[i]); // Free the old scattered memory
          </div>
          <div className={step >= 3 ? "code-step active" : "code-step inactive"}>
            4. arr[i] = &copy[i]; // Update pointers to new locations
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanUpPtrArrVisualization;
