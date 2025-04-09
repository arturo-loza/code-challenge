import Select from "react-select";
import { useState } from 'react';
import './OptionSelector.css';

const OptionSelector = props => {
    const [category, setCategory] = useState('Popular')
    const { handleRules, handleLanguage, rule, language } = props;

    const ruleOptions = [
            // { value: '', label: 'Select...'},
            { value: 'fibo', label: 'Fibonacci' },
            { value: 'prime', label: 'Prime Numbers' },
            { value: 'odd', label: 'Odd/Even' },
        ]

    const languageOptions= [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' }
    ]

    return (
        <div className={'option-container'}>
            <div className={'category'}>
                <b> Category: </b> {category}
            </div>
            <div className={'selectors selector-container'}>
                <div className={'rule-selector'}>
                    <span> Rules: </span>
                    <Select
                        className={'option-selector'}
                        options={ruleOptions}
                        onChange={handleRules}
                    />
                </div>
                <div className={'language-selector'}>
                    <span> Language: </span>
                    <Select
                        defaultValue={languageOptions[0]}
                        className={'option-selector'}
                        options={languageOptions}
                        onChange={handleLanguage}
                    />
                </div>
            </div>
        </div>
    )
}

export default OptionSelector
