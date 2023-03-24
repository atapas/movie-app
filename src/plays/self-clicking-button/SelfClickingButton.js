import PlayHeader from 'common/playlists/PlayHeader';
import './styles.css';
import { useState, useEffect, useRef } from 'react';

// WARNING: Do not change the entry componenet name
function SelfClickingButton(props) {
  // Your Code Start below.
  const buttonRef = useRef(null);
  const [counter, setCounter] = useState(0);

  function clickHandler(event) {
    setCounter((prev) => prev + 1);
  }

  useEffect(() => {
    buttonRef.current.addEventListener('click', clickHandler);

    const interval = setInterval(() => {
      buttonRef.current.click();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="play-details">
        <PlayHeader play={props} />
        <div className="play-details-body">
          {/* Your Code Starts Here */}
          <div className="self-click">
            <button ref={buttonRef}> Self Click Button</button>
            <p className="output">
              At{' '}
              <u>
                {new Date().getHours() +
                  ':' +
                  new Date().getMinutes() +
                  ':' +
                  new Date().getSeconds()}
              </u>{' '}
              clicked <u>{counter}</u> times
            </p>
          </div>
          {/* Your Code Ends Here */}
        </div>
      </div>
    </>
  );
}

export default SelfClickingButton;
