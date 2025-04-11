import Select from "react-select";
import { useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";

import './OptionSelector.css';

interface Props {
    handleRules: (ev: any) => void,
    handleLanguage: (ev: any) => void,
    handleCategory: (ev: any) => void,
}

const OptionSelector = (props: Props) => {
    const { handleRules, handleLanguage, handleCategory } = props;
    const intl = useIntl();

    const ruleOptions = [
        { value: 'fibo', label: intl.formatMessage({ id: 'movies.rules.fibo' }) },
        { value: 'prime', label: intl.formatMessage({ id: 'movies.rules.prime' }) },
        { value: 'odd', label: intl.formatMessage({ id: 'movies.rules.odd' }) },
    ]

    const languageOptions= [
        { value: 'en', label: intl.formatMessage({ id: 'movies.language.en' }) },
        { value: 'es', label: intl.formatMessage({ id: 'movies.language.es' }) },
        { value: 'fr', label: intl.formatMessage({ id: 'movies.language.fr' }) },
    ]

    const categoryOptions= [
        { value: 'popular', label: intl.formatMessage({ id: 'movies.category.popular' }) },
        { value: 'top_rated', label: intl.formatMessage({ id: 'movies.category.top_rated' }) },
        { value: 'upcoming', label: intl.formatMessage({ id: 'movies.category.upcoming' }) },
        { value: 'now_playing', label: intl.formatMessage({ id: 'movies.category.now_playing' }) },
    ]

    return (
        <div className={'option-container'}>
            <div className={'selectors category-selector'}>
                <b><FormattedMessage id='movies.category' />:</b>
                <Select
                    height={36}
                    className={'option-selector'}
                    options={categoryOptions}
                    onChange={handleCategory}
                />
            </div>
            <div className={'selectors rule-selector'}>
                <span>
                    <b><FormattedMessage id='movies.rules.label' />:</b>
                 </span>
                <Select
                    className={'option-selector'}
                    options={ruleOptions}
                    onChange={handleRules}
                />
            </div>
            <div className={'selectors language-selector'}>
                <span>
                    <b><FormattedMessage id='movies.language.label' />:</b>
                </span>
                <Select
                    defaultValue={languageOptions[0]}
                    className={'option-selector'}
                    options={languageOptions}
                    onChange={handleLanguage}
                />
            </div>
        </div>
    )
}

export default OptionSelector
