import React, { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import './PointerCastingExplanation.css';

const PointerCastingExplanation = () => {
  const [currentExample, setCurrentExample] = useState(0);

  const examples = [
    {
      title: 'Why we need casting',
      description: "void* pointers can't be dereferenced directly",
    },
    {
      title: 'Method 1: Cast then dereference',
      description: 'Cast to typed pointer first, then use that pointer',
    },
    {
      title: 'Method 2: Cast and dereference in one step',
      description: 'Cast and dereference in a single expression',
    },
    {
      title: 'Memory layout comparison',
      description: 'Both methods access the same memory locations',
    },
  ];

  const MemoryBox = ({ value, address, label, highlighted = false, color = '' }) => (
    <div className={`pce-mem ${highlighted ? 'hl' : ''} ${color}`}>
      <div className="pce-mem-addr">{address}</div>
      <div className="pce-mem-val mono">{value}</div>
      <div className="pce-mem-label">{label}</div>
    </div>
  );

  const CodeBlock = ({ title, code, highlighted = false, error = false }) => (
    <div className={`pce-card ${error ? 'card-red' : highlighted ? 'card-green' : 'card-gray'}`}>
      <h4 className="pce-card-title">{title}</h4>
      <pre className="pce-code mono small">{code}</pre>
    </div>
  );

  const PointerDiagram = ({ label, address, pointsTo, highlighted = false }) => (
    <div className={`pce-pointer ${highlighted ? 'hl' : ''}`}>
      <div className="pce-pointer-side">
        <div className="bold">{label}</div>
        <div className="muted xsmall">Address: {address}</div>
      </div>
      <ArrowRight size={20} className="pce-pointer-arrow" />
      <div className="pce-pointer-side">
        <div>Points to: {pointsTo}</div>
        <div className="muted xsmall">Contains the actual data</div>
      </div>
    </div>
  );

  return (
    <div className="pce-container">
      <h2 className="pce-title">Pointer Casting: void* to int*</h2>

      {/* Navigation */}
      <div className="pce-tabs">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setCurrentExample(index)}
            className={`pce-tab ${currentExample === index ? 'active' : ''}`}
          >
            {index + 1}. {example.title}
          </button>
        ))}
      </div>

      <div className="pce-info pce-blue">
        <h3 className="bold mb2">{examples[currentExample].title}</h3>
        <p>{examples[currentExample].description}</p>
      </div>

      {currentExample === 0 && (
        <div className="grid gap24">
          <div className="pce-info pce-yellow">
            <h4 className="bold mb2">The Problem: void* can't be dereferenced</h4>
            <p className="small">
              When we have void* pointers, the compiler doesn't know what type of data they point to.
            </p>
          </div>

          {/* Function signature reminder */}
          <div className="pce-info pce-gray">
            <h4 className="bold mb2">Our Function Signature:</h4>
            <pre className="pce-code mono small">{`void multiply_two_numbers(void *partial, const void *next, void *result)`}</pre>
            <div className="small mt1">All parameters are void* - the compiler doesn't know they contain integers!</div>
          </div>

          <div className="two-col gap16">
            {/* What doesn't work */}
            <CodeBlock
              title="❌ This WON'T work:"
              code={`void multiply_two_numbers(void *partial, const void *next, void *result) {
    // ERROR: Can't dereference void*
    *result = *partial * *next;  // COMPILER ERROR!
}`}
              error={true}
            />

            {/* Why it doesn't work */}
            <div className="pce-card card-red">
              <h4 className="bold mb2 red900">Why this fails:</h4>
              <ul className="list small">
                <li>• void* has no type information</li>
                <li>• Compiler doesn't know how many bytes to read</li>
                <li>• Doesn't know what operations are valid</li>
                <li>• Can't perform arithmetic on unknown types</li>
              </ul>
            </div>
          </div>

          <div className="pce-info pce-green">
            <h4 className="bold mb2 green900">Solution: Cast to specific type first</h4>
            <p className="small">We must tell the compiler "this void* actually points to an int" by casting it to int*</p>
          </div>
        </div>
      )}

      {currentExample === 1 && (
        <div className="grid gap24">
          <div className="pce-info pce-green">
            <h4 className="bold mb2">Method 1: Cast to typed pointers first</h4>
            <p className="small">Create typed pointer variables, then use them normally.</p>
          </div>

          {/* Step by step */}
          <CodeBlock
            title="Step-by-step approach:"
            code={`void multiply_two_numbers(void *partial, const void *next, void *result) {
    // Step 1: Cast void* to int* pointers
    int *partial_int = (int *)partial;           // partial now treated as int*
    const int *next_int = (const int *)next;     // next now treated as const int*
    int *result_int = (int *)result;             // result now treated as int*
    
    // Step 2: Use the typed pointers normally
    *result_int = (*partial_int) * (*next_int);  // Normal pointer dereferencing
}`}
            highlighted={true}
          />

          {/* Memory diagram */}
          <div className="pce-info pce-gray">
            <h4 className="bold mb2">Memory Layout:</h4>

            <div className="grid gap16">
              {/* Original void pointers */}
              <div>
                <div className="small mb1 bold">Original void* parameters:</div>
                <div className="stack gap8">
                  <PointerDiagram label="void *partial" address="0xFF00" pointsTo="some memory location" />
                  <PointerDiagram label="const void *next" address="0xFF04" pointsTo="some memory location" />
                  <PointerDiagram label="void *result" address="0xFF08" pointsTo="some memory location" />
                </div>
                <div className="xsmall muted mt1">Compiler doesn't know what type of data is at these locations</div>
              </div>

              <div className="center">
                <ArrowDown size={24} className="arrow-down" />
              </div>

              {/* After casting */}
              <div>
                <div className="small mb1 bold">After casting to int* pointers:</div>
                <div className="stack gap8">
                  <PointerDiagram label="int *partial_int" address="0xFF00" pointsTo="integer (4 bytes)" highlighted={true} />
                  <PointerDiagram label="const int *next_int" address="0xFF04" pointsTo="integer (4 bytes)" highlighted={true} />
                  <PointerDiagram label="int *result_int" address="0xFF08" pointsTo="integer (4 bytes)" highlighted={true} />
                </div>
                <div className="xsmall muted mt1">Now compiler knows these point to 4-byte integers</div>
              </div>
            </div>
          </div>

          {/* Example with actual values */}
          <div className="pce-info pce-blue">
            <h4 className="bold mb2">Example with actual values:</h4>
            <div className="two-col gap16">
              <div className="center">
                <div className="small mb1 bold">*partial_int</div>
                <MemoryBox value="5" address="0x1000" label="int" highlighted={true} />
              </div>
              <div className="center">
                <div className="small mb1 bold">*next_int</div>
                <MemoryBox value="3" address="0x1004" label="int" highlighted={true} />
              </div>
              <div className="center">
                <div className="small mb1 bold">*result_int =</div>
                <MemoryBox value="15" address="0x1008" label="int" color="pce-green-border" />
              </div>
            </div>
            <div className="center small mt1">*result_int = (*partial_int) * (*next_int) = 5 * 3 = 15</div>
          </div>
        </div>
      )}

      {currentExample === 2 && (
        <div className="grid gap24">
          <div className="pce-info pce-purple">
            <h4 className="bold mb2">Method 2: Cast and dereference in one step</h4>
            <p className="small">Skip the intermediate pointer variables and do everything in one expression.</p>
          </div>

          <CodeBlock
            title="One-liner approach:"
            code={`void multiply_two_numbers(void *partial, const void *next, void *result) {
    // Cast and dereference in single expressions
    *(int *)result = *(int *)partial * *(const int *)next;
}`}
            highlighted={true}
          />

          {/* Breaking down the expression */}
          <div className="pce-info pce-gray">
            <h4 className="bold mb2">Breaking down: *(int *)result</h4>

            <div className="grid gap16">
              <div className="two-col gap16">
                <div className="pce-mini-card">
                  <h5 className="bold mb1">Step 1: (int *)result</h5>
                  <div className="xsmall">
                    <div>• Takes void* pointer <code>result</code></div>
                    <div>• Casts it to int*</div>
                    <div>• Now compiler knows it points to int</div>
                  </div>
                </div>

                <div className="pce-mini-card">
                  <h5 className="bold mb1">Step 2: *(int *)result</h5>
                  <div className="xsmall">
                    <div>• Takes the cast int* pointer</div>
                    <div>• Dereferences it with *</div>
                    <div>• Gets the actual int value</div>
                  </div>
                </div>

                <div className="pce-mini-card pce-blue">
                  <h5 className="bold mb1">Result:</h5>
                  <div className="xsmall">
                    <div>• Access to the integer</div>
                    <div>• Can read or write to it</div>
                    <div>• Left side = assignment target</div>
                  </div>
                </div>
              </div>

              {/* Visual representation */}
              <div className="pce-info pce-yellow">
                <h5 className="bold mb1">Visual breakdown:</h5>
                <div className="mono xsmall">
                  <div><span className="red600">*(int *)</span><span className="blue600">result</span> = <span className="red600">*(int *)</span><span className="blue600">partial</span> * <span className="red600">*(const int *)</span><span className="blue600">next</span>;</div>
                  <div className="muted xs mt1"><span className="red600">Red: casting and dereferencing</span> | <span className="blue600">Blue: original void* pointers</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Operator precedence */}
          <div className="pce-info pce-orange">
            <h4 className="bold mb2">Important: Operator Precedence</h4>
            <div className="two-col gap16">
              <div className="pce-mini-card">
                <h5 className="bold mb1 green600">✅ Correct (with parentheses):</h5>
                <code className="small">*(int *)result</code>
                <div className="xs mt1">1. Cast: (int *)result<br/>2. Dereference: *(...)</div>
              </div>
              <div className="pce-mini-card pce-red-border">
                <h5 className="bold mb1 red600">❌ Wrong (without parentheses):</h5>
                <code className="small">*int *result</code>
                <div className="xs mt1">Syntax error - can't parse this</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentExample === 3 && (
        <div className="grid gap24">
          <div className="pce-info pce-gray">
            <h4 className="bold mb2">Both methods access the same memory</h4>
            <p className="small">The two approaches are functionally identical - just different syntax.</p>
          </div>

          {/* Side by side comparison */}
          <div className="two-col gap24">
            <CodeBlock
              title="Method 1: Separate casting"
              code={`void multiply_two_numbers(void *partial, const void *next, void *result) {
    int *partial_int = (int *)partial;
    const int *next_int = (const int *)next;
    int *result_int = (int *)result;
    
    *result_int = (*partial_int) * (*next_int);
}`}
            />

            <CodeBlock
              title="Method 2: Inline casting"
              code={`void multiply_two_numbers(void *partial, const void *next, void *result) {
    *(int *)result = *(int *)partial * *(const int *)next;
}`}
            />
          </div>

          {/* Memory access comparison */}
          <div className="pce-info pce-blue">
            <h4 className="bold mb2">Memory Access Comparison:</h4>

            <div className="grid gap16">
              <div className="small">Assume: partial points to 5, next points to 3, result points to uninitialized memory</div>

              <div className="two-col gap16">
                <div className="pce-mini-card">
                  <h5 className="bold mb1">Method 1 execution:</h5>
                  <div className="mono xs">
                    <div>1. partial_int = (int *)partial  → gets pointer to int</div>
                    <div>2. next_int = (const int *)next  → gets pointer to const int</div>
                    <div>3. result_int = (int *)result   → gets pointer to int</div>
                    <div>4. *result_int = (*partial_int) * (*next_int)</div>
                    <div>5. *result_int = 5 * 3 = 15</div>
                  </div>
                </div>

                <div className="pce-mini-card">
                  <h5 className="bold mb1">Method 2 execution:</h5>
                  <div className="mono xs">
                    <div>1. *(int *)result = *(int *)partial * *(const int *)next</div>
                    <div>2. *(int *)result = 5 * 3</div>
                    <div>3. *(int *)result = 15</div>
                    <div>4. (writes 15 to memory location)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pros and cons */}
          <div className="two-col gap16">
            <div className="pce-mini-card pce-green">
              <h4 className="bold mb1 green900">Method 1 Pros:</h4>
              <ul className="list small">
                <li>• More readable and clear</li>
                <li>• Easier to debug</li>
                <li>• Can reuse pointer variables</li>
                <li>• Explicit about what's happening</li>
              </ul>
            </div>

            <div className="pce-mini-card pce-purple">
              <h4 className="bold mb1 purple900">Method 2 Pros:</h4>
              <ul className="list small">
                <li>• More concise</li>
                <li>• No temporary variables</li>
                <li>• Less lines of code</li>
                <li>• Direct expression</li>
              </ul>
            </div>
          </div>

          <div className="pce-info pce-yellow">
            <h4 className="bold mb2">Which to choose?</h4>
            <div className="small stack gap6">
              <div><strong>Method 1</strong> is generally preferred for:</div>
              <ul className="list">
                <li>Learning and understanding</li>
                <li>Complex operations with multiple uses of the same pointer</li>
                <li>When readability is important</li>
              </ul>
              <div className="mt1"><strong>Method 2</strong> is common in:</div>
              <ul className="list">
                <li>Simple, one-time operations</li>
                <li>Compact code where space matters</li>
                <li>When you're comfortable with the syntax</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="pce-info pce-blue mt2">
        <h4 className="bold mb1">Key Takeaways:</h4>
        <ul className="list small">
          <li>• <strong>void* cannot be dereferenced</strong> - must cast to specific type first</li>
          <li>• <strong>(int *)ptr</strong> - casts void* to int*</li>
          <li>• <strong>*(int *)ptr</strong> - casts and dereferences in one step</li>
          <li>• <strong>Both methods are equivalent</strong> - choose based on readability preference</li>
          <li>• <strong>Parentheses matter</strong> - (int *)ptr not int *ptr</li>
        </ul>
      </div>
    </div>
  );
};

export default PointerCastingExplanation;
