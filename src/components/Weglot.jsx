import React, { useEffect } from 'react'

function WeglotLoader() {

    useEffect(() => {
    const loadWeglot = () => {
      if (!window.Weglot) {
        const script = document.createElement('script');
        script.src = 'https://cdn.weglot.com/weglot.min.js';
        script.async = true;
        script.onload = () => {
          if (window.Weglot) {
            window.Weglot.initialize({
              api_key: 'wg_3bf56f417103c32925391508a34aea138',
            });
          }
        };
        script.onerror = () => {
          console.error("Failed to load Weglot script.");
        };
        document.body.appendChild(script);
      }
    };

    loadWeglot();

    return () => {
      const existingScript = document.querySelector('script[src="https://cdn.weglot.com/weglot.min.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div style={{backgroundColor: 'red'}}>
     <div id="weglot-selector" />
    </div>
  )
}

export default WeglotLoader

