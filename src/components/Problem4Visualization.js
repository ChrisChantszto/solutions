import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import './Problem4Visualization.css';

const Problem4Visualization = () => {
  const [currentPart, setCurrentPart] = useState('a');
  const [step, setStep] = useState(0);
  
  // Part A data
  const initialArray = [5, 1, 2, 7, 5, 3, 8, 0];
  const [arrayState, setArrayState] = useState([...initialArray]);
  const [nelems, setNelems] = useState(8);
  const [currentI, setCurrentI] = useState(7);
  
  // Part B data - farm structs
  const farmData = [
    { count: 5, species: 'chickens', speciesLen: 8 }, // 5+8=13
    { count: 18, species: 'cows', speciesLen: 4 },    // 18+4=22  
    { count: 3, species: 'pigs', speciesLen: 4 },     // 3+4=7
    { count: 12, species: 'sheep', speciesLen: 5 }    // 12+5=17
  ];

  const resetPartA = () => {
    setArrayState([...initialArray]);
    setNelems(8);
    setCurrentI(7);
    setStep(0);
  };

  const nextStepA = () => {
    if (step === 0) {
      setStep(1);
    } else if (currentI > 0) {
      const newArray = [...arrayState];
      const firstElement = newArray[0]; // 5
      
      if (newArray[currentI] < firstElement) {
        // Remove element at currentI by shifting left
        for (let j = currentI; j < nelems - 1; j++) {
          newArray[j] = newArray[j + 1];
        }
        setArrayState(newArray);
        setNelems(nelems - 1);
      }
      setCurrentI(currentI - 1);
    }
  };

  const ArrayElement = ({ value, index, highlighted = false, comparing = false, removed = false }) => (
    <div className={`arr-box ${highlighted ? 'highlighted' : ''} ${comparing ? 'comparing' : ''} ${removed ? 'removed' : ''}`}>
      <span className="arr-bit">{value}</span>
      <div className="index-label">[{index}]</div>
    </div>
  );

  const FarmStruct = ({ farm, highlighted = false, label = '' }) => (
    <div className={`farm-card ${highlighted ? 'farm-highlight' : ''}`}>
      <div className="farm-label">{label}</div>
      <div className="farm-body">
        <div>count: <span className="mono">{farm.count}</span></div>
        <div>species: <span className="mono">"{farm.species}"</span></div>
        <div className="farm-length">length: {farm.speciesLen}</div>
        <div className="farm-sum">
          sum: {farm.count} + {farm.speciesLen} = {farm.count + farm.speciesLen}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p4-container">
      <h2 className="p4-title">Problem 4: Generics and Function Pointers</h2>
      
      {/* Part Selection */}
      <div className="part-nav">
        <button
          onClick={() => setCurrentPart('a')}
          className={`part-btn ${currentPart === 'a' ? 'active-a' : ''}`}
        >
          Part (a): remove_less Function
        </button>
        <button
          onClick={() => setCurrentPart('b')}
          className={`part-btn ${currentPart === 'b' ? 'active-b' : ''}`}
        >
          Part (b): farm_compare Function
        </button>
      </div>

      {currentPart === 'a' && (
        <div className="inline-grid big-gap">
          <div className="card card-blue">
            <h3 className="card-title">Part (a): remove_less Function</h3>
            <p>
              <strong>Goal:</strong> Remove all elements that are LESS THAN the first element (5).
            </p>
            <p className="muted">
              We iterate backwards (i--) to avoid index shifting problems when removing elements.
            </p>
          </div>

          {/* Controls */}
          <div className="controls">
            <button 
              onClick={nextStepA}
              disabled={currentI <= 0 && step > 0}
              className="btn btn-blue"
            >
              <Play size={16} /> Next Step
            </button>
            <button 
              onClick={resetPartA}
              className="btn btn-gray"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>

          {/* Current state */}
          <div className="card card-gray">
            <div className="block">
              <strong>Current state:</strong> i = {currentI}, nelems = {nelems}
            </div>
            <div className="block">
              <strong>First element (comparison target):</strong> {arrayState[0]}
            </div>
            {currentI > 0 && step > 0 && (
              <div className="block">
                <strong>Comparing:</strong> {`arr[${currentI}] = ${arrayState[currentI]}`} 
                {arrayState[currentI] < arrayState[0] ? ' < ' : ' >= '} 
                {arrayState[0]} 
                {arrayState[currentI] < arrayState[0] ? ' → REMOVE' : ' → KEEP'}
              </div>
            )}
          </div>

          {/* Array visualization */}
          <div className="card card-white">
            <h4 className="card-title">Array State:</h4>
            <div className="bit-row relative">
              {arrayState.slice(0, nelems).map((value, index) => (
                <ArrayElement
                  key={`${index}-${value}`}
                  value={value}
                  index={index}
                  highlighted={index === currentI && step > 0}
                  comparing={index === 0 && step > 0}
                />
              ))}
              {arrayState.length > nelems && (
                <div className="removed-label">{`(${arrayState.length - nelems} removed)`}</div>
              )}
            </div>
          </div>

          {/* Code walkthrough */}
          <div className="card card-gray">
            <h4 className="card-title">Code Execution:</h4>
            <pre className="code-block mono small">
{`for (size_t i = *nelems - 1; i > 0; i--) {
    void *ith = (char *)arr + i * width;
    int res = cmp(ith, arr);
    if (res < 0) {
        memmove(ith, (char *)ith + width, (*nelems - i - 1) * width);
        (*nelems)--;
    }
}`}
            </pre>
          </div>

          {/* Key insights */}
          <div className="card card-yellow">
            <h4 className="card-title">Key Insights:</h4>
            <ul className="list">
              <li>• We iterate <strong>backwards</strong> (i--) to avoid index problems when removing</li>
              <li>• <strong>void *ith = (char *)arr + i * width</strong> calculates address of element i</li>
              <li>• <strong>cmp(ith, arr)</strong> compares element i with element 0</li>
              <li>• <strong>memmove</strong> shifts remaining elements left to fill the gap</li>
              <li>• <strong>*nelems</strong> is decremented to reflect the new size</li>
            </ul>
          </div>
        </div>
      )}

      {currentPart === 'b' && (
        <div className="inline-grid big-gap">
          <div className="card card-green">
            <h3 className="card-title">Part (b): farm_compare Function</h3>
            <p>
              <strong>Goal:</strong> Compare farm structs by (count + string length).
            </p>
            <p className="muted">
              The comparison function should return: negative if p &lt; q, zero if p == q, positive if p &gt; q.
            </p>
          </div>

          {/* Struct definition */}
          <div className="card card-gray">
            <h4 className="card-title">Struct Definition:</h4>
            <pre className="code-block">
{`struct farm {
  size_t count;
  char *species;
};`}
            </pre>
          </div>

          {/* Farm examples */}
          <div className="two-col">
            <div>
              <h4 className="card-title">Example Farm Structs:</h4>
              <div className="stack">
                {farmData.map((farm, index) => (
                  <FarmStruct
                    key={index}
                    farm={farm}
                    label={`farm[${index}]`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="card-title">Comparison Examples:</h4>
              <div className="stack big-gap">
                <div className="card card-blue border">
                  <div className="font-medium">Comparing farm[0] vs farm[1]:</div>
                  <div className="stack small">
                    <div>farm[0]: 5 + 8 = <strong>13</strong></div>
                    <div>farm[1]: 18 + 4 = <strong>22</strong></div>
                    <div className="accent-blue">Result: 13 - 22 = <strong>-9</strong> (negative, so farm[0] &lt; farm[1])</div>
                  </div>
                </div>

                <div className="card card-green border">
                  <div className="font-medium">Comparing farm[1] vs farm[3]:</div>
                  <div className="stack small">
                    <div>farm[1]: 18 + 4 = <strong>22</strong></div>
                    <div>farm[3]: 12 + 5 = <strong>17</strong></div>
                    <div className="accent-green">Result: 22 - 17 = <strong>+5</strong> (positive, so farm[1] &gt; farm[3])</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Code solution */}
          <div className="card card-gray">
            <h4 className="card-title">Solution Code:</h4>
            <pre className="code-block mono small">
{`int farm_compare(const void *p, const void *q) {
  const struct farm *fp = (const struct farm *)p;
  const struct farm *fq = (const struct farm *)q;

  int sum_p = fp->count + strlen(fp->species);
  int sum_q = fq->count + strlen(fq->species);

  return sum_p - sum_q;
}`}
            </pre>
          </div>

          {/* Step by step explanation */}
          <div className="card card-yellow">
            <h4 className="card-title">Step-by-Step Explanation:</h4>
            <ol className="list">
              <li><strong>1. Cast void pointers:</strong> Convert void* to struct farm* so we can access fields</li>
              <li><strong>2. Calculate sums:</strong> For each struct, add count + strlen(species)</li>
              <li><strong>3. Return difference:</strong> sum_p - sum_q gives the comparison result</li>
              <li><strong>4. Result interpretation:</strong>
                <ul className="list nested">
                  <li>• Negative: p &lt; q</li>
                  <li>• Zero: p == q</li>
                  <li>• Positive: p &gt; q</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Why this pattern */}
          <div className="card card-purple">
            <h4 className="card-title">Why This Pattern?</h4>
            <div className="stack">
              <p>This comparison function can be used with generic sorting functions like <code>qsort()</code>:</p>
              <pre className="code-block">
{`qsort(farm_array, 4, sizeof(struct farm), farm_compare);`}
              </pre>
              <p>The generic function doesn't know about farm structs - it just calls your comparison function to determine order!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem4Visualization;
