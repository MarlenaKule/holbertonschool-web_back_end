/* ==========================================================================
 * App.jsx  —  React + Bootstrap homework
 * Goal: understand useState and useEffect (with and without dependencies)
 * ==========================================================================
 *
 * HOW TO READ THIS FILE
 * ---------------------
 * This file defines FOUR components:
 *
 *   1. Counter      -> teaches useState + useEffect WITH a dependency
 *   2. Clock        -> teaches useEffect with an EMPTY dependency array + cleanup
 *   3. SearchList   -> teaches useState with text and arrays
 *   4. App          -> the "root" component that puts the other three together
 *
 * Putting several components in one file is perfectly legal in React.
 * In a bigger project you would split them into separate files inside
 * src/components/, but for a first assignment one file is easier to follow.
 *
 * IMPORTANT: a "component" is just a JavaScript function that
 *   - has a name starting with a Capital Letter (this is mandatory in React), and
 *   - returns some JSX (the HTML-looking code below).
 * React calls that function whenever it needs to draw the component on screen.
 * Each call of that function is called a "render".
 * ========================================================================== */


/* --------------------------------------------------------------------------
 * IMPORTS
 * --------------------------------------------------------------------------
 * "import" brings code from another file/package into this one.
 * The curly braces { } mean we are importing specific named things,
 * not the whole package.
 *
 * useState and useEffect are called HOOKS. A hook is a special function,
 * provided by React, that lets a component "hook into" React features.
 * Rules for hooks (memorise these, they are strict):
 *   - only call them at the TOP LEVEL of a component function
 *   - never inside an if, a loop, or a nested function
 * ------------------------------------------------------------------------ */
import { useState, useEffect } from 'react';


/* ==========================================================================
 * COMPONENT 1 — Counter
 * Demonstrates: useState, and useEffect WITH a dependency array [count]
 * ========================================================================== */
function Counter() {
  /* ------------------------------------------------------------------------
   * useState — the "memory" of a component
   * ------------------------------------------------------------------------
   * Normal JavaScript variables are forgotten every time the function runs
   * again. useState gives us a value that SURVIVES between renders, and that
   * tells React "redraw the screen" whenever it changes.
   *
   * useState(0) returns an ARRAY with exactly two items:
   *    [ the current value , a function to change that value ]
   *
   * The square brackets on the left are "array destructuring": a shortcut to
   * unpack those two items into two variables in one line. We could have
   * written it the long way:
   *
   *    const state    = useState(0);
   *    const count    = state[0];
   *    const setCount = state[1];
   *
   * The names `count` and `setCount` are OUR choice. The convention is
   * `something` / `setSomething`.
   *
   * The 0 passed to useState is the INITIAL value, used only on the very
   * first render.
   * ---------------------------------------------------------------------- */
  const [count, setCount] = useState(0);

  /* ------------------------------------------------------------------------
   * WHY WE NEVER WRITE `count = count + 1`
   * ------------------------------------------------------------------------
   * Two reasons:
   *   1. `count` is declared with `const`, so JavaScript forbids reassigning it.
   *   2. Even if we could, React would not know anything changed and would
   *      never redraw the screen.
   * The ONLY correct way to change state is to call the setter: setCount(...).
   * ---------------------------------------------------------------------- */

  /* ------------------------------------------------------------------------
   * useEffect #1 — WITH a dependency array: [count]
   * ------------------------------------------------------------------------
   * useEffect lets a component do something that is NOT "returning JSX":
   * talking to the browser, starting a timer, fetching data from a server,
   * writing to the console... These are called SIDE EFFECTS.
   *
   * useEffect takes two arguments:
   *    useEffect( function to run , dependency array )
   *
   * The dependency array controls WHEN the function runs:
   *    [count]  -> run after the first render, then again ONLY when `count`
   *                has a different value than in the previous render.
   *
   * Here we change the text in the browser TAB. Click the buttons and watch
   * the tab title at the top of your browser change — this is the easiest way
   * to actually SEE a dependency array doing its job.
   * ---------------------------------------------------------------------- */
  useEffect(() => {
    document.title = `Count: ${count}`;
    console.log(`[Counter] effect ran because count changed to ${count}`);
  }, [count]); // <-- the dependency array

  /* ------------------------------------------------------------------------
   * useEffect #2 — WITHOUT a dependency array (no second argument at all)
   * ------------------------------------------------------------------------
   * With no array, the effect runs after EVERY SINGLE RENDER of this
   * component — no matter what caused the render.
   *
   * Notice the difference in the console: this one also fires when you type
   * nothing but simply re-render for any other reason.
   *
   * WARNING: never call a state setter (like setCount) inside an effect with
   * no dependency array. Setting state causes a render, which runs the effect,
   * which sets state again... = an infinite loop that freezes the page.
   * ---------------------------------------------------------------------- */
  useEffect(() => {
    console.log('[Counter] effect with NO dependency array — runs after every render');
  }); // <-- notice: no second argument

  /* ------------------------------------------------------------------------
   * THE RETURNED JSX
   * ------------------------------------------------------------------------
   * JSX looks like HTML but it is really JavaScript. Two differences to
   * remember right now:
   *   - `class` becomes `className` (because `class` is a reserved word in JS)
   *   - anything inside { } is real JavaScript, evaluated and inserted
   *
   * All the class names below (card, card-body, btn, btn-primary, ...) come
   * from BOOTSTRAP. We write no CSS ourselves.
   * ---------------------------------------------------------------------- */
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body text-center">
        <h5 className="card-title">Counter</h5>
        <p className="card-text text-muted small">
          useState + useEffect with <code>[count]</code>
        </p>

        {/* { count } inserts the current value of the JavaScript variable */}
        <p className="display-4 my-3">{count}</p>

        {/* ------------------------------------------------------------------
          * onClick expects a FUNCTION to call later, not a call made now.
          *
          *   onClick={() => setCount(count + 1)}   CORRECT — a function
          *   onClick={setCount(count + 1)}         WRONG — runs immediately
          *
          * `() => ...` is an "arrow function", a compact way of writing
          * `function () { ... }`.
          * ---------------------------------------------------------------- */}
        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setCount(count - 1)}
          >
            −1
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setCount(count + 1)}
          >
            +1
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>

        <p className="card-text text-muted small mt-3 mb-0">
          Look at the browser tab title as you click.
        </p>
      </div>
    </div>
  );
}


/* ==========================================================================
 * COMPONENT 2 — Clock
 * Demonstrates: useEffect with an EMPTY dependency array [] + a CLEANUP function
 * ========================================================================== */
function Clock() {
  /* `new Date()` creates a JavaScript object holding the current date & time.
     We store it in state so that changing it redraws the clock. */
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    console.log('[Clock] effect ran — starting the interval (mount)');

    /* --------------------------------------------------------------------
     * setInterval is a plain browser function: "call this function every
     * N milliseconds". 1000 ms = 1 second. It returns an id we can use
     * later to stop it.
     * ------------------------------------------------------------------ */
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    /* --------------------------------------------------------------------
     * THE CLEANUP FUNCTION
     * --------------------------------------------------------------------
     * If an effect RETURNS a function, React will call that returned
     * function when the component is removed from the screen ("unmount"),
     * and also before re-running the effect.
     *
     * Without this, the interval would keep firing forever in the
     * background even after the clock disappears — a "memory leak".
     * Use the toggle button in the app and watch the console messages.
     * ------------------------------------------------------------------ */
    return () => {
      console.log('[Clock] cleanup ran — stopping the interval (unmount)');
      clearInterval(intervalId);
    };
  }, []); /* <-- EMPTY array: "this effect depends on nothing", so run it
                 ONCE when the component appears, and never again. */

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body text-center">
        <h5 className="card-title">Live clock</h5>
        <p className="card-text text-muted small">
          useEffect with <code>[]</code> + cleanup
        </p>

        {/* toLocaleTimeString() formats the Date object as a readable time */}
        <p className="display-6 my-3">{time.toLocaleTimeString()}</p>

        <p className="card-text text-muted small mb-0">
          The effect started a timer once, when this card appeared.
        </p>
      </div>
    </div>
  );
}


/* ==========================================================================
 * COMPONENT 3 — SearchList
 * Demonstrates: useState holding text, filtering an array, and an effect
 *               that depends on a computed value
 * ========================================================================== */
function SearchList() {
  /* A plain constant. It never changes, so it does NOT need to be state.
     Rule of thumb: only put something in state if changing it should
     redraw the screen. */
  const fruits = [
    'Apple', 'Banana', 'Blueberry', 'Cherry', 'Grape',
    'Lemon', 'Mango', 'Orange', 'Peach', 'Strawberry',
  ];

  /* State holding whatever the user has typed. Starts as an empty string. */
  const [query, setQuery] = useState('');

  /* --------------------------------------------------------------------
   * A DERIVED VALUE — computed fresh on every render, not stored in state.
   *
   *   .filter(...)      keeps only the items for which the test is true
   *   .toLowerCase()    makes the search case-insensitive
   *   .includes(...)    true if the text contains the search text
   *
   * Beginners often try to store this in state too. Don't: anything you
   * can calculate from existing state should just be calculated.
   * ------------------------------------------------------------------ */
  const visibleFruits = fruits.filter((fruit) =>
    fruit.toLowerCase().includes(query.toLowerCase())
  );

  /* --------------------------------------------------------------------
   * useEffect WITH a dependency: runs whenever the number of results
   * changes — not on every keystroke. Type "b", then "bl", then "blu":
   * the effect only fires when the count actually changes.
   * ------------------------------------------------------------------ */
  useEffect(() => {
    console.log(`[SearchList] results changed: ${visibleFruits.length} item(s)`);
  }, [visibleFruits.length]);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-center">Search</h5>
        <p className="card-text text-muted small text-center">
          useState driving a filtered list
        </p>

        {/* ------------------------------------------------------------------
          * A "CONTROLLED INPUT": React owns the value of this box.
          *   value={query}          -> what is displayed comes from state
          *   onChange={...}         -> every keystroke updates that state
          *
          * `event` is an object the browser passes automatically;
          * `event.target` is the input element, `.value` is its text.
          *
          * Remove `value={query}` and the box still types, but React is no
          * longer the single source of truth — avoid that.
          * ---------------------------------------------------------------- */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Type to filter…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {/* ------------------------------------------------------------------
          * CONDITIONAL RENDERING with the ternary operator:
          *     condition ? valueIfTrue : valueIfFalse
          * ---------------------------------------------------------------- */}
        {visibleFruits.length === 0 ? (
          <p className="text-muted text-center mb-0">No matches.</p>
        ) : (
          <ul className="list-group">
            {/* --------------------------------------------------------------
              * .map() turns an array of strings into an array of JSX elements.
              * React draws every element of that array.
              *
              * The `key` prop is REQUIRED when rendering a list. React uses it
              * to tell items apart between renders. It must be unique and
              * stable — here the fruit name works because there are no
              * duplicates. (Using the array index is a common but fragile
              * habit; avoid it when items can be reordered or removed.)
              * ------------------------------------------------------------ */}
            {visibleFruits.map((fruit) => (
              <li className="list-group-item" key={fruit}>
                {fruit}
              </li>
            ))}
          </ul>
        )}

        <p className="card-text text-muted small mt-3 mb-0">
          Showing {visibleFruits.length} of {fruits.length}.
        </p>
      </div>
    </div>
  );
}


/* ==========================================================================
 * COMPONENT 4 — App (the root component)
 * Demonstrates: composing components, and mounting/unmounting to make the
 *               cleanup function visible
 * ========================================================================== */
function App() {
  /* Boolean state controlling whether the Clock exists on screen at all.
     This is what lets us demonstrate the cleanup function. */
  const [showClock, setShowClock] = useState(true);

  return (
    /* Bootstrap layout classes:
       container  -> centres the content with sensible margins
       py-4       -> padding on the y axis (top and bottom), size 4
       row / col  -> Bootstrap's 12-column responsive grid
       g-4        -> gutter (space) between grid columns                     */
    <div className="container py-4">

      <header className="text-center mb-4">
        <h1 className="mb-1">React Hooks Demo</h1>
        <p className="text-muted">
          useState and useEffect, styled with Bootstrap
        </p>
        <p className="text-muted small">
          Open the browser console (F12) to watch the effects fire.
        </p>
      </header>

      <div className="row g-4">
        {/* col-12 = full width on small screens
            col-lg-4 = one third of the width on large screens */}
        <div className="col-12 col-lg-4">
          <Counter />
        </div>

        <div className="col-12 col-lg-4">
          {/* ------------------------------------------------------------------
            * CONDITIONAL RENDERING with && ("logical AND"):
            * if showClock is true, the <Clock /> is drawn;
            * if it is false, nothing is drawn — the component is destroyed,
            * and its cleanup function runs.
            * ---------------------------------------------------------------- */}
          {showClock && <Clock />}

          {!showClock && (
            <div className="card shadow-sm h-100">
              <div className="card-body text-center d-flex align-items-center justify-content-center">
                <p className="text-muted mb-0">
                  Clock removed — its cleanup function has run.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="col-12 col-lg-4">
          <SearchList />
        </div>
      </div>

      <div className="text-center mt-4">
        {/* Passing the OPPOSITE of the current value flips the boolean. */}
        <button
          className="btn btn-secondary"
          onClick={() => setShowClock(!showClock)}
        >
          {showClock ? 'Remove the clock' : 'Bring the clock back'}
        </button>
      </div>

    </div>
  );
}


/* --------------------------------------------------------------------------
 * EXPORT
 * --------------------------------------------------------------------------
 * `export default` makes App available to other files. main.jsx imports it
 * with `import App from './App.jsx'`. Because it is a DEFAULT export, the
 * importing file may call it anything — but keeping the same name is clearer.
 * ------------------------------------------------------------------------ */
export default App;
