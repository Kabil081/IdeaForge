import React, { useState, useEffect, useCallback } from 'react';

const VoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const newRecognition = new SpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
      newRecognition.lang = 'en-US';

      newRecognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInputText(transcript);
      };

      newRecognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(newRecognition);
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setInputText('');
    }
    setIsListening(!isListening);
  }, [isListening, recognition]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
      <div className='flex '>
        <input
          type="text"
          placeholder="Speak or type here..."
          value={inputText}
          onChange={handleInputChange} 
        />
        <button onClick={toggleListening} disabled={!recognition} className='bg-blue-600 text-white rounded-lg px-[10px] py-[5px]'>
          {isListening ? 'Stop' : 'Start'}
        
        </button>
      </div>
  );
};

export default VoiceInput;