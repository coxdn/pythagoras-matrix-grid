import React from 'react'
import SelectSearch from 'react-select-search'
import '../../../css/select-search.css'

class PeoplesSearch extends React.PureComponent {
    // Custom text filter that searches across multiple fields
    createFilter = (onInputChange) => (options, { value }) => {
        const q = (value || '').toString().trim().toLowerCase()
        const filtered = !q
            ? options
            : options.filter(opt => {
                const item = opt.item ? opt.item : opt
                const fields = [item.name, item.date, item.age, item.tagSearch]
                return fields.some(f => f && String(f).toLowerCase().includes(q))
            })
        if (typeof onInputChange === 'function') {
            // Report current query and filtered list length
            onInputChange(value || '', filtered)
        }
        return filtered
    }

    // Wrap library's input to intercept typing and key presses
    renderValue = (valueProps, snapshot, className) => {
        const { onInputChange, onInputKeyPress } = this.props
        const handleChange = (e) => {
            // Keep library behavior
            if (valueProps.onChange) valueProps.onChange(e)
            // Mirror to wrapper for Message
            if (typeof onInputChange === 'function') {
                onInputChange(e.target.value, snapshot.options)
            }
        }
        const handleKeyDown = (e) => {
            // Let wrapper decide whether to consume the event
            if (typeof onInputKeyPress === 'function') {
                const proceed = onInputKeyPress(e)
                if (proceed === false) {
                    e.preventDefault()
                    e.stopPropagation()
                    return
                }
            }
            if (valueProps.onKeyDown) valueProps.onKeyDown(e)
        }
        return (
            <input
                {...valueProps}
                className={className}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        )
    }

    renderOption = (domProps, option /* , snapshot, className is in domProps.className */) => {
        const item = option.item ? option.item : option
        const photo = item.photo ? <img className="avatar" src={item.photo} /> : null
        const tag = item.tags ? item.tags.map((tag, i) => <span key={i}>{tag.value}</span>) : ''
        return (
            <button {...domProps}>
                {photo}
                <span>{item.name}</span>
                <span>{item.date}{item.age ? ` (${item.age})` : ''}</span>
                <span>{tag}</span>
            </button>
        )
    }

    render() {
        const { peoples, selected, handleSelected, onInputChange } = this.props
        const filterOptions = [this.createFilter(onInputChange)]

        return (
            <SelectSearch
                name="peoples"
                multiple
                options={peoples}
                value={selected}
                placeholder="Поиск..."
                autoFocus
                filterOptions={filterOptions}
                renderOption={this.renderOption}
                renderValue={this.renderValue}
                onChange={handleSelected}
                search
            />
        )
    }
}

export { PeoplesSearch }
