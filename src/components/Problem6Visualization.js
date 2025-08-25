import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import './Problem6Visualization.css';

const Problem6Visualization = () => {
  const [currentPart, setCurrentPart] = useState('concept');
  const [step, setStep] = useState(0);
  const [currentI, setCurrentI] = useState(0);

  // Example data for visualization
  const intArray = [2, 3, 4, 5];

  const [partialResult, setPartialResult] = useState(1);

  const resetAnimation = () => {
    setStep(0);
    setCurrentI(0);
    setPartialResult(1);
  };

  const nextStep = () => {
    if (currentI < intArray.length) {
      const newResult = partialResult * intArray[currentI];
      setPartialResult(newResult);
      setCurrentI(currentI + 1);
      setStep(step + 1);
    }
  };

  const MemoryBox = ({ value, label, address, highlighted = false, size = 'w16' }) => (
    <div className={`mem-box ${size} ${highlighted ? 'highlighted' : ''}`}>
      <div className="mem-addr">{address}</div>
      <div className="mem-val mono">{value}</div>
      <div className="mem-label">{label}</div>
    </div>
  );

  const FunctionBox = ({ title, code, highlighted = false }) => (
    <div className={`func-box ${highlighted ? 'func-highlight' : ''}`}>
      <h4 className="card-title">{title}</h4>
      <pre className="code-block mono xsmall">{code}</pre>
    </div>
  );

  return (
    <div className="p6-container">
      <h2 className="p6-title">Problem 6: Generic Accumulate Function</h2>

      {/* Part Selection */}
      <div className="part-nav wrap">
        <button
          onClick={() => setCurrentPart('concept')}
          className={`part-btn ${currentPart === 'concept' ? 'active-blue' : ''}`}
        >
          Concept
        </button>
        <button
          onClick={() => setCurrentPart('solution-a')}
          className={`part-btn ${currentPart === 'solution-a' ? 'active-green' : ''}`}
        >
          Part (a) Solution
        </button>
        <button
          onClick={() => setCurrentPart('solution-b')}
          className={`part-btn ${currentPart === 'solution-b' ? 'active-purple' : ''}`}
        >
          Part (b) Solution
        </button>
        <button
          onClick={() => setCurrentPart('animation')}
          className={`part-btn ${currentPart === 'animation' ? 'active-orange' : ''}`}
        >
          Step-by-Step Animation
        </button>
      </div>

      {currentPart === 'concept' && (
        <div className="inline-grid big-gap">
          <div className="card card-blue">
            <h3 className="card-title">The Problem: Repeated Pattern Recognition</h3>
            <p>
              Both functions follow the same pattern: start with an initial value, then repeatedly apply an operation.
            </p>
          </div>

          {/* Original functions comparison */}
          <div className="two-col">
            <FunctionBox 
              title="int_array_product"
              code={`int int_array_product(const int array[], size_t n) {
    int result = 1;                    // Initial: 1
    for (size_t i = 0; i < n; i++) {
        result = result * array[i];    // Operation: multiply
    }
    return result;
}`}            />
            <FunctionBox 
              title="double_array_sum"
              code={`double double_array_sum(const double array[], size_t n) {
    double result = 0.0;               // Initial: 0.0
    for (size_t i = 0; i < n; i++) {
        result = result + array[i];    // Operation: add
    }
    return result;
}`}            />
          </div>

          {/* Pattern identification */}
          <div className="card card-yellow">
            <h4 className="card-title">Common Pattern:</h4>
            <div className="stack small">
              <div>1. <strong>Initialize:</strong> result = initial_value</div>
              <div>2. <strong>Loop:</strong> for each element in array</div>
              <div>3. <strong>Apply:</strong> result = operation(result, current_element)</div>
              <div>4. <strong>Return:</strong> final result</div>
            </div>
          </div>

          {/* Generic solution concept */}
          <div className="card card-green">
            <h4 className="card-title">Generic Solution Concept:</h4>
            <div className="stack small">
              <div><strong>Make it work with any type:</strong> Use void* pointers</div>
              <div><strong>Make operation flexible:</strong> Pass function pointer</div>
              <div><strong>Make initial value flexible:</strong> Pass as parameter</div>
              <div><strong>Handle different sizes:</strong> Pass element size</div>
            </div>
          </div>

          {/* Function signature explanation */}
          <div className="card card-purple">
            <h4 className="card-title">Function Signature Breakdown:</h4>
            <pre className="code-block mono small">{`void accumulate(const void *base, size_t n, size_t elem_size,
                BinaryFunc fn, const void *init, void *result)`}</pre>
            <div className="stack small">
              <div><strong>base:</strong> Array base address (generic void*)</div>
              <div><strong>n:</strong> Number of elements</div>
              <div><strong>elem_size:</strong> Size of each element in bytes</div>
              <div><strong>fn:</strong> Function to apply (add, multiply, etc.)</div>
              <div><strong>init:</strong> Initial value address</div>
              <div><strong>result:</strong> Where to store final result</div>
            </div>
          </div>
        </div>
      )}

      {currentPart === 'solution-a' && (
        <div className="inline-grid big-gap">
          <div className="card card-green">
            <h3 className="card-title">Part (a): Implementing accumulate</h3>
          </div>

          <div className="card card-gray">
            <h4 className="card-title">Complete Solution:</h4>
            <pre className="code-block mono small">{`void accumulate(const void *base, size_t n, size_t elem_size,
                BinaryFunc fn, const void *init, void *result) {
    // Step 1: Initialize result with init value
    memcpy(result, init, elem_size);
    
    // Step 2: Loop through array elements
    for (size_t i = 0; i < n; i++) {
        // Calculate address of current element
        const void *current = (const char *)base + i * elem_size;
        
        // Apply function: fn(result, current, result)
        fn(result, current, result);
    }
}`}</pre>
          </div>

          {/* Step-by-step explanation */}
          <div className="inline-grid big-gap">
            <div className="card card-blue">
              <h4 className="card-title">Step 1: memcpy arguments</h4>
              <pre className="code-block mono xsmall">{`memcpy(result, init, elem_size);`}</pre>
              <div className="stack small">
                <div><strong>Destination:</strong> result (where to copy to)</div>
                <div><strong>Source:</strong> init (what to copy)</div>
                <div><strong>Size:</strong> elem_size (how many bytes)</div>
                <div><strong>Purpose:</strong> Initialize result with the starting value</div>
              </div>
            </div>

            <div className="card card-purple">
              <h4 className="card-title">Step 2: Pointer arithmetic in loop</h4>
              <pre className="code-block mono xsmall">{`const void *current = (const char *)base + i * elem_size;`}</pre>
              <div className="stack small">
                <div><strong>Cast to char*:</strong> Enables byte-level arithmetic</div>
                <div><strong>i * elem_size:</strong> Byte offset to element i</div>
                <div><strong>Result:</strong> Address of current array element</div>
              </div>
            </div>

            <div className="card card-orange">
              <h4 className="card-title">Step 3: Function call</h4>
              <pre className="code-block mono xsmall">{`fn(result, current, result);`}</pre>
              <div className="stack small">
                <div><strong>1st param:</strong> result (current accumulated value)</div>
                <div><strong>2nd param:</strong> current (next array element)</div>
                <div><strong>3rd param:</strong> result (where to store new result)</div>
                <div><strong>Note:</strong> result serves as both input and output!</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPart === 'solution-b' && (
        <div className="inline-grid big-gap">
          <div className="card card-purple">
            <h3 className="card-title">Part (b): Using accumulate for multiplication</h3>
          </div>

          <div className="card card-gray">
            <h4 className="card-title">Binary Function Implementation:</h4>
            <pre className="code-block mono small">{`static void multiply_two_numbers(void *partial, const void *next, void *result) {
    // Cast void pointers to int pointers
    int *partial_int = (int *)partial;
    const int *next_int = (const int *)next;
    int *result_int = (int *)result;
    
    // Perform multiplication
    *result_int = (*partial_int) * (*next_int);
}`}</pre>
          </div>

          <div className="card card-gray">
            <h4 className="card-title">Reimplemented int_array_product:</h4>
            <pre className="code-block mono small">{`int int_array_product(const int array[], size_t n) {
    int init_value = 1;        // Starting value for multiplication
    int result;                // Where result will be stored
    
    accumulate(array,          // base address
               n,              // number of elements  
               sizeof(int),    // element size
               multiply_two_numbers,  // function to apply
               &init_value,    // address of initial value
               &result);       // address for result
               
    return result;
}`}</pre>
          </div>

          <div className="card card-blue overflow-x">
            <h4 className="card-title">Parameter Mapping:</h4>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>accumulate parameter</th>
                    <th>Value passed</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mono">base</td>
                    <td>array</td>
                    <td>Points to first element</td>
                  </tr>
                  <tr>
                    <td className="mono">n</td>
                    <td>n</td>
                    <td>Number of elements</td>
                  </tr>
                  <tr>
                    <td className="mono">elem_size</td>
                    <td>sizeof(int)</td>
                    <td>4 bytes per element</td>
                  </tr>
                  <tr>
                    <td className="mono">fn</td>
                    <td>multiply_two_numbers</td>
                    <td>Multiplication function</td>
                  </tr>
                  <tr>
                    <td className="mono">init</td>
                    <td>&amp;init_value</td>
                    <td>Address of value 1</td>
                  </tr>
                  <tr>
                    <td className="mono">result</td>
                    <td>&amp;result</td>
                    <td>Where to store answer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card card-yellow">
            <h4 className="card-title">Key Insights:</h4>
            <ul className="list">
              <li>• <strong>Generic types:</strong> void* allows any data type</li>
              <li>• <strong>Function pointers:</strong> Make operation configurable</li>
              <li>• <strong>Address passing:</strong> init and result passed by address</li>
              <li>• <strong>Type casting:</strong> Binary function must cast void* to actual types</li>
              <li>• <strong>Reusability:</strong> Same accumulate for sum, product, max, etc.</li>
            </ul>
          </div>
        </div>
      )}

      {currentPart === 'animation' && (
        <div className="inline-grid big-gap">
          <div className="card card-orange">
            <h3 className="card-title">Step-by-Step Execution</h3>
            <p>Watch how accumulate processes array [2, 3, 4, 5] with multiplication</p>
          </div>

          {/* Controls */}
          <div className="controls">
            <button 
              onClick={nextStep}
              disabled={currentI >= intArray.length}
              className="btn btn-orange"
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

          {/* Current state */}
          <div className="card card-gray">
            <div className="block">
              <strong>Current step:</strong> {currentI === 0 && step === 0 ? 'Initialization' : `Processing element ${currentI - 1}`}
            </div>
            <div className="block">
              <strong>Partial result:</strong> {partialResult}
            </div>
            {currentI < intArray.length && step > 0 && (
              <div className="small">
                Next operation: {partialResult} × {intArray[currentI]} = {partialResult * intArray[currentI]}
              </div>
            )}
          </div>

          {/* Memory layout */}
          <div className="two-col">
            <div className="card card-white">
              <h4 className="card-title">Array in Memory</h4>
              <div className="flex-wrap">
                {intArray.map((value, index) => (
                  <MemoryBox
                    key={index}
                    value={value}
                    label={`[${index}]`}
                    address={`0x${(1000 + index * 4).toString(16)}`}
                    highlighted={step > 0 && index === currentI - 1}
                  />
                ))}
              </div>
              <div className="caption">
                elem_size = 4 bytes, total = {intArray.length} elements
              </div>
            </div>

            <div className="card card-white">
              <h4 className="card-title">Variables</h4>
              <div className="stack">
                <MemoryBox
                  value="1"
                  label="init_value"
                  address="stack"
                  size="w20"
                />
                <MemoryBox
                  value={partialResult}
                  label="result"
                  address="stack"
                  highlighted={true}
                  size="w20"
                />
              </div>
            </div>
          </div>

          {/* Function call trace */}
          <div className="card card-blue">
            <h4 className="card-title">Function Call Trace</h4>
            <div className="stack mono small">
              <div>accumulate(array, 4, sizeof(int), multiply_two_numbers, &amp;init_value, &amp;result)</div>
              <div className="indent">memcpy(&amp;result, &amp;init_value, 4) → result = 1</div>
              {step > 0 && (
                <div className="indent accent-blue">
                  Loop iteration {currentI - 1}: multiply_two_numbers(&amp;result, &amp;array[{currentI - 1}], &amp;result)
                </div>
              )}
              {Array.from({ length: Math.min(step, intArray.length) }, (_, i) => (
                <div key={i} className="indent2 accent-green">
                  Step {i + 1}: {(i === 0 ? 1 : intArray.slice(0, i).reduce((a, b) => a * b, 1))} × {intArray[i]} = {intArray.slice(0, i + 1).reduce((a, b) => a * b, 1)}
                </div>
              ))}
            </div>
          </div>

          {step >= intArray.length && (
            <div className="card card-green">
              <h4 className="card-title">Final Result</h4>
              <div className="small">
                Product of [2, 3, 4, 5] = <strong>{partialResult}</strong>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      <div className="card card-gray">
        <h4 className="card-title">Key Takeaways</h4>
        <ul className="list">
          <li>• <strong>Generic programming:</strong> One function works for multiple types</li>
          <li>• <strong>Function pointers:</strong> Make behavior configurable</li>
          <li>• <strong>Memory management:</strong> Use memcpy for initialization</li>
          <li>• <strong>Pointer arithmetic:</strong> Calculate element addresses manually</li>
          <li>• <strong>Type safety:</strong> Cast void* to appropriate types in callback</li>
        </ul>
      </div>
    </div>
  );
};

export default Problem6Visualization;
