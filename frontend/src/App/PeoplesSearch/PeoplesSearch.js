import React from 'react'
import Select from 'react-select'
// no comments

class PeoplesSearch extends React.PureComponent {
    matchesQuery = (item, q) => {
        const query = (q || '').toString().trim().toLowerCase()
        if (!query) return true
        const fields = [item.name, item.date, item.age, item.tagSearch]
        return fields.some(f => f && String(f).toLowerCase().includes(query))
    }

    handleInputChange = (inputValue) => {
        const { peoples, onInputChange } = this.props
        const filtered = (peoples || []).filter(opt => this.matchesQuery(opt, inputValue))
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

        const filterOption = (candidate, rawInput) => {
            const item = candidate.data.item ? candidate.data.item : candidate.data
            return this.matchesQuery(item, rawInput)
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
                options={peoples}
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
                filterOption={filterOption}
                classNamePrefix="react-select"
                menuPortalTarget={document.body}
                styles={selectStyles}
            />
        )
    }
}

export { PeoplesSearch }
