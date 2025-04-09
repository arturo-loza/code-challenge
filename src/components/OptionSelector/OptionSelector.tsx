import Select from "react-select";
import { useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";

import './OptionSelector.css';

const OptionSelector = props => {
    const [category, setCategory] = useState('Popular')
    const { handleRules, handleLanguage, rule, language } = props;
    const intl = useIntl();

    const ruleOptions = [
            // { value: '', label: 'Select...'},
            { value: 'fibo', label: intl.formatMessage({ id: 'movies.rules.fibo' }) },
            { value: 'prime', label: intl.formatMessage({ id: 'movies.rules.prime' }) },
            { value: 'odd', label: intl.formatMessage({ id: 'movies.rules.odd' }) },
        ]

    const languageOptions= [
        { value: 'en', label: intl.formatMessage({ id: 'movies.language.en' }) },
        { value: 'es', label: intl.formatMessage({ id: 'movies.language.es' }) },
        { value: 'fr', label: intl.formatMessage({ id: 'movies.language.fr' }) },
    ]

    return (
        <div className={'option-container'}>
            <div className={'category'}>
                <b>
                    <FormattedMessage id='movies.category' />:
                </b>
                {' '}
                {category}
            </div>
            <div className={'selectors selector-container'}>
                <div className={'rule-selector'}>
                    <span>
                        <FormattedMessage id='movies.rules.label' />:
                    </span>
                    <Select
                        className={'option-selector'}
                        options={ruleOptions}
                        onChange={handleRules}
                    />
                </div>
                <div className={'language-selector'}>
                    <span>
                        <FormattedMessage id='movies.language.label' />:
                    </span>
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
