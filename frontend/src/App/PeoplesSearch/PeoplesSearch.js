import React from 'react'
import Select from 'react-select'

class PeoplesSearch extends React.PureComponent {
    normalizeSearchText = (value) => String(value || '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim()

    getSearchTokens = (q) => this.normalizeSearchText(q).split(' ').filter(Boolean)

    getTagValues = (item) => {
        if (!item.tags) return []
        return item.tags.map(tag => {
            if (!tag) return ''
            if (tag.value !== undefined && tag.value !== null) return tag.value
            if (tag.label !== undefined && tag.label !== null) return tag.label
            return tag
        })
    }

    getSearchFields = (item) => {
        const tagValues = this.getTagValues(item)
        const name = this.normalizeSearchText(item.name)
        const tags = this.normalizeSearchText([item.tagSearch].concat(tagValues).filter(Boolean).join(' '))
        const date = this.normalizeSearchText(item.date)
        const age = this.normalizeSearchText(item.age)
        const all = this.normalizeSearchText([name, tags, date, age].filter(Boolean).join(' '))
        return { name, tags, date, age, all }
    }

    getOptionScore = (item, q) => {
        const query = this.normalizeSearchText(q)
        const tokens = this.getSearchTokens(query)
        if (!tokens.length) return 1

        const fields = this.getSearchFields(item)
        const fullPhraseInName = fields.name.includes(query)
        const fullPhraseInTags = fields.tags.includes(query)
        const fullPhraseInDate = fields.date.includes(query) || fields.age.includes(query)
        const fullPhraseInAll = fields.all.includes(query)
        const allTokensMatched = tokens.every(token => fields.all.includes(token))
        const tokenScore = tokens.reduce((score, token) => {
            if (fields.name.includes(token)) return score + 300
            if (fields.tags.includes(token)) return score + 150
            if (fields.date.includes(token) || fields.age.includes(token)) return score + 80
            return score
        }, 0)

        if (!fullPhraseInAll && !tokenScore) return 0

        return (
            (fullPhraseInName ? 10000 : 0) +
            (fullPhraseInTags ? 9000 : 0) +
            (fullPhraseInDate ? 8000 : 0) +
            (fullPhraseInAll ? 7000 : 0) +
            (allTokensMatched ? 5000 : 0) +
            tokenScore
        )
    }

    getRankedOptions = (peoples, q) => {
        const query = this.normalizeSearchText(q)
        const source = peoples || []
        if (!query) return source

        return source
            .map((option, index) => ({ option, index, score: this.getOptionScore(option, query) }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score || a.index - b.index)
            .map(item => item.option)
    }

    handleInputChange = (inputValue) => {
        const { peoples, onInputChange } = this.props
        const filtered = this.getRankedOptions(peoples, inputValue)
        if (typeof onInputChange === 'function') {
            onInputChange(inputValue || '', filtered)
        }
        return inputValue
    }

    handleKeyDown = (e) => {
        const { onInputKeyPress } = this.props
        if (typeof onInputKeyPress === 'function') {
            const proceed = onInputKeyPress(e)
            if (proceed === false) {
                e.preventDefault()
                e.stopPropagation()
            }
        }
    }

    formatOptionLabel = (option) => {
        const item = option.item ? option.item : option
        const tagStyle = {
            display: 'inline-block',
            border: '1px solid gray',
            borderRadius: 10,
            padding: '2px 4px',
            lineHeight: '12px',
            fontSize: 12,
            marginRight: 4,
        }
        const photo = item.photo
            ? (
                <img
                    src={item.photo}
                    alt={item.name || ''}
                    style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
                />
            )
            : null
        const tag = item.tags ? item.tags.map((t, i) => <span key={i} style={tagStyle}>{t.value}</span>) : ''
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {photo}
                <span>{item.name}</span>
                <span>{item.date}{item.age ? ` (${item.age})` : ''}</span>
                <span>{tag}</span>
            </div>
        )
    }

    render() {
        const { peoples, selected, handleSelected, inputValue } = this.props
        const rankedOptions = this.getRankedOptions(peoples, inputValue)

        const valueOptions = Array.isArray(selected)
            ? (peoples || []).filter(o => selected.includes(o.value))
            : null

        const onChange = (opts, actionMeta) => {
            if (actionMeta && actionMeta.option) {
                handleSelected(actionMeta.option.value)
                return
            }
            if (Array.isArray(opts) && opts.length) {
                const last = opts[opts.length - 1]
                if (last) handleSelected(last.value)
            }
        }

        const selectStyles = {
            control: (base) => ({
                ...base,
                width: 545,
                marginLeft: 10,
            }),
            menu: (base) => ({
                ...base,
                width: 545,
                marginLeft: 10,
                zIndex: 1200,
            }),
            menuPortal: (base) => ({
                ...base,
                zIndex: 1200
            }),
        }

        return (
            <Select
                name="peoples"
                isMulti
                options={rankedOptions}
                value={valueOptions}
                placeholder="Поиск..."
                autoFocus
                onChange={onChange}
                onInputChange={this.handleInputChange}
                inputValue={inputValue}
                onKeyDown={this.handleKeyDown}
                getOptionValue={(o) => o.value}
                getOptionLabel={(o) => o.name || String(o.value)}
                formatOptionLabel={this.formatOptionLabel}
                filterOption={() => true}
                classNamePrefix="react-select"
                menuPortalTarget={document.body}
                styles={selectStyles}
            />
        )
    }
}

export { PeoplesSearch }