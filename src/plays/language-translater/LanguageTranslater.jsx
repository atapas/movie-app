import PlayHeader from 'common/playlists/PlayHeader';
import './styles.css';
import { useEffect, useState } from 'react';
import languages from './Languages';
import copy from './icons/Copy.svg';
import sound from './icons/sound_max_fill.svg';
import { debounce } from 'lodash';
import switchLang from './icons/Horizontal_top_left_main.svg';

// WARNING: Do not change the entry componenet name
function LanguageTranslater(props) {
  const [inputText, setInputText] = useState('Hello, How are you?'); // set input text for initial render
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('Autodetect'); // set initial sourceLang to Autodetect
  const [targetLang, setTargetLang] = useState('fr'); // set initial targetLang to french

  // used useEffect to translation during initial render
  useEffect(() => {
    translate();
  }, []);

  // fetching the data from API
  const translate = async () => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}!&langpair=${sourceLang}|${targetLang}`
      );
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (err) {
      window.alert('Error translating text:', err);
    }
  };

  // used debounce for limiting the rate at which the translation function is called
  const debouncedTranslate = debounce(translate, 300);

  // function for initializing translation
  const handleTranslate = () => {
    debouncedTranslate();
  };

  // function to switch source and target languages
  const switchLanguage = () => {
    if (sourceLang !== 'Autodetect') {
      const temp = sourceLang;
      setSourceLang(targetLang);
      setTargetLang(temp);
    } else {
      window.alert('Cannot switch language when source language is Autodetect');
    }
  };

  // clipboard copy function
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // text to speech function
  const handleListen = async (text, language) => {
    try {
      const utterence = new SpeechSynthesisUtterance(text);
      utterence.language = language;
      await window.speechSynthesis.speak(utterence);
    } catch (err) {
      window.alert(`Listening error: `, err);
    }
  };

  return (
    <>
      <div className="play-details">
        <PlayHeader play={props} />
        <div className="play-details-body Language-Translator_body">
          {/* Your Code Starts Here */}
          <div>
            <div className="Language-Translator_container">
              <div className="Language-Translator_sourceLang">
                <section className="Language-Translator_languages">
                  <button
                    className={`Language-Translator_langButtons ${sourceLang === 'Autodetect' ? 'selected' : ''}`}
                    value="Autodetect"
                    onClick={(e) => setSourceLang(e.target.value)}
                  >
                    Detect Language
                  </button>
                  <button
                    className={`Language-Translator_langButtons ${sourceLang === 'en' ? 'selected' : ''}`}
                    value="en"
                    onClick={(e) => setSourceLang(e.target.value)}
                  >
                    English
                  </button>
                  <button
                    className={`Language-Translator_langButtons ${sourceLang === 'fr' ? 'selected' : ''}`}
                    value="fr"
                    onClick={(e) => setSourceLang(e.target.value)}
                  >
                    French
                  </button>
                  <select
                    className="Language-Translator_langSelectBtn"
                    name="languages"
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </section>
                <section className="Language-Translator_textbox">
                  <textarea
                    className="Language-Translator_textarea"
                    maxLength={500}
                    rows={10}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <div className="Language-Translator_wordCount">{inputText.length}/500</div>
                </section>
                <section className="Language-Translator_buttons">
                  <div className="Language-Translator_imgBtns">
                    <img
                      alt="copy svg"
                      className="Language-Translator_img"
                      src={copy}
                      onClick={() => handleCopy(inputText)}
                    />
                    <img
                      alt="sound svg"
                      className="Language-Translator_img"
                      src={sound}
                      onClick={() => handleListen(inputText, sourceLang)}
                    />
                  </div>
                  <div className="Language-Translator_translateBtn" onClick={handleTranslate}>
                    Translate
                  </div>
                </section>
              </div>
              <div className="Language-Translator_targetLang">
                <section className="Language-Translator_languages">
                  <button
                    className={`Language-Translator_langButtons ${targetLang === 'en' ? 'selected' : ''}`}
                    value="en"
                    onClick={(e) => setTargetLang(e.target.value)}
                  >
                    English
                  </button>
                  <button
                    className={`Language-Translator_langButtons ${targetLang === 'fr' ? 'selected' : ''}`}
                    value="fr"
                    onClick={(e) => setTargetLang(e.target.value)}
                  >
                    French
                  </button>
                  <select
                    className="Language-Translator_langSelectBtn"
                    name="languages"
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <img
                    alt="switch Btn"
                    className="Language-Translator_img"
                    src={switchLang}
                    onClick={switchLanguage}
                  />
                </section>
                <section className="Language-Translator_textbox">
                  <textarea
                    readOnly
                    className="Language-Translator_textarea"
                    maxLength={500}
                    rows={10}
                    value={translatedText}
                  />
                  <div className="Language-Translator_wordCount">{translatedText.length}/500</div>
                </section>
                <section className="Language-Translator_buttons">
                  <div className="Language-Translator_imgBtns">
                    <img
                      alt="copy svg"
                      className="Language-Translator_img"
                      src={copy}
                      onClick={() => handleCopy(translatedText)}
                    />
                    <img
                      alt="sound svg"
                      className="Language-Translator_img"
                      src={sound}
                      onClick={() => handleListen(translatedText, targetLang)}
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
          {/* Your Code Ends Here */}
        </div>
      </div>
    </>
  );
}

export default LanguageTranslater;
