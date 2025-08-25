import React from 'react';
import './MidtermSolutions.css';

const MidtermSolutions = () => {
  return (
    <div className="ms-container">
      <h2 className="ms-title">CS107 Midterm — Worked Answers</h2>

      {/* Problem 1 */}
      <section className="card card-blue">
        <h3 className="card-title">Problem 1: Integer Representation (7 pts)</h3>
        <div className="stack">
          <div className="answer-block">
            <div className="answer-label">(a) Binary representation of 'm'</div>
            <div className="mono">ASCII 'm' = 109 → 8-bit binary: <strong>01101101</strong></div>
          </div>
          <div className="answer-block">
            <div className="answer-label">(b) 0xCA as signed 8-bit value</div>
            <div className="mono">0xCA = 202 → 202 - 256 = <strong>-54</strong></div>
          </div>
          <div className="answer-block">
            <div className="answer-label">(c) -31 in 8-bit two's complement</div>
            <div className="mono">31 = 00011111 → invert + 1 → <strong>11100001</strong></div>
          </div>
          <div className="answer-block">
            <div className="answer-label">(d) Favorite hex number</div>
            <div className="mono">Examples: 0xDEADBEEF, 0xCAFE, 0xBEEF</div>
          </div>
        </div>
      </section>

      {/* Problem 2 */}
      <section className="card card-green">
        <h3 className="card-title">Problem 2: Pointers and Arrays (8 pts)</h3>
        <p className="muted">Copy ints to a single contiguous block, free old nodes, and repoint array elements.</p>
        <pre className="code-block mono small">{`void clean_up_ptrarr(int *arr[], size_t nelems) {
    int *copy = malloc(nelems * sizeof(int));
    for (size_t i = 0; i < nelems; i++) {
        copy[i] = *(arr[i]);     // Copy the value
        free(arr[i]);            // Free the old memory
        arr[i] = &copy[i];       // Point to new location
    }
}`}</pre>
      </section>

      {/* Problem 3 */}
      <section className="card card-yellow">
        <h3 className="card-title">Problem 3: Memory Diagram (13 pts)</h3>
        <div className="two-col">
          <div className="card card-white">
            <h4 className="card-title">Stack</h4>
            <ul className="list">
              <li>aaron → points to 'u' in "burr, sir" (read-only)</li>
              <li>the_other → points to heap array</li>
              <li>eliza[0] → points to "satisfied" on heap</li>
              <li>eliza[1] → points to 'r' in "burr, sir"</li>
            </ul>
          </div>
          <div className="stack">
            <div className="card card-white">
              <h4 className="card-title">Heap</h4>
              <pre className="code-block mono small">{`the_other: [51][0][0][85][0][0][0][0][0][0][0][0]
            0  1  2  3  4  5  6  7  8  9  10 11
"satisfied": [s][a][t][i][s][f][i][e][d][\0]
              0  1  2  3  4  5  6  7  8  9`}</pre>
            </div>
            <div className="card card-white">
              <h4 className="card-title">Read-only Data</h4>
              <pre className="code-block mono small">{`"burr, sir": [b][u][r][r][,][ ][s][i][r][\0]
               0  1  2  3  4  5  6  7  8  9`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Problem 4 */}
      <section className="card card-purple">
        <h3 className="card-title">Problem 4: Generics and Function Pointers (13 pts)</h3>
        <div className="stack">
          <div className="card card-gray">
            <h4 className="card-title">(a) remove_less</h4>
            <pre className="code-block mono small">{`void remove_less(void *arr, size_t *nelems, size_t width, cmp_fun_t cmp) {
    for (size_t i = *nelems - 1; i > 0; i--) {
        void *ith = (char *)arr + i * width;
        int res = cmp(ith, arr);
        if (res < 0) {
            memmove(ith, (char *)ith + width, (*nelems - i - 1) * width);
            (*nelems)--;
        }
    }
}`}</pre>
          </div>
          <div className="card card-gray">
            <h4 className="card-title">(b) farm_compare</h4>
            <pre className="code-block mono small">{`int farm_compare(const void *p, const void *q) {
    const struct farm *fp = (const struct farm *)p;
    const struct farm *fq = (const struct farm *)q;
    int sum_p = fp->count + strlen(fp->species);
    int sum_q = fq->count + strlen(fq->species);
    return sum_p - sum_q;
}`}</pre>
          </div>
        </div>
      </section>

      {/* Problem 5 */}
      <section className="card card-green">
        <h3 className="card-title">Problem 5: Bitwise Operations (8 pts)</h3>
        <div className="two-col">
          <div className="card card-white">
            <h4 className="card-title">(a) With loop</h4>
            <pre className="code-block mono small">{`bool zeros_detector(unsigned int n) {
    for (int i = 0; i < 31; i++) {
        if (((n >> i) & 1) == 0 && ((n >> (i + 1)) & 1) == 0) {
            return true;
        }
    }
    return false;
}`}</pre>
          </div>
          <div className="card card-white">
            <h4 className="card-title">(b) Without loop</h4>
            <pre className="code-block mono small">{`bool zeros_detector(unsigned int n) {
    return ((~n) & ((~n) >> 1)) != 0;
}`}</pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MidtermSolutions;
