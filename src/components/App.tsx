import { IntlProvider, FormattedMessage } from "react-intl";
import { useState } from 'react';

import Movies from "./Movies/Movies";

import enJson from '../assets/i18n/locale_en.json'
import esJson from '../assets/i18n/locale_es.json'
import frJson from '../assets/i18n/locale_fr.json'

import './App.css';

const App = () => {
    const [locale, setLocale] = useState('en');
    const [messages, setMessages] = useState(enJson);

    const handleLanguageChange = lang => {
        setLocale(lang)
        switch (lang) {
            case 'es':
                setMessages(esJson)
                break;
            case 'fr':
                setMessages(frJson)
                break;
            case 'en':
            default:
                setMessages(enJson)
        }
    }

    return (
        <IntlProvider messages={messages} locale={locale}>
            <h1>
                <FormattedMessage id='movies.title' />
            </h1>
            <Movies handleLanguageChange={handleLanguageChange} />
        </IntlProvider>
    )
}

export default App;
