import React from 'react'
import CreatableSelect from 'react-select/creatable'
import { components } from 'react-select'
import { TooltipText, formatCreatedAtTooltip } from './TooltipText'

import '../../../css/select-plus.css'
import '../../../css/select-search.css'

const getTagLabel = (tag) => {
    if (!tag) return ''
    if (tag.label !== undefined && tag.label !== null) return tag.label
    if (tag.value !== undefined && tag.value !== null) return tag.value
    return tag
}

const TagMultiValueLabel = (props) => {
    const tooltip = formatCreatedAtTooltip(props.data && props.data.createdAt)

    return (
        <components.MultiValueLabel {...props}>
            <TooltipText title={tooltip}>{getTagLabel(props.data)}</TooltipText>
        </components.MultiValueLabel>
    )
}

class SelectTags extends React.Component {
    // constructor(props) {
    //     super(props)
    state = {
        isMulti: true,
        multiValue: [],
        options: []
    }
    // }

    handleOnChange = value => {
        // console.log('--- handleOnChange', value)
        this.props.onChangeTags(value)
        this.setState({ multiValue: value })
    }

    componentDidMount() {
        const { tags: multiValue } = this.props
        this.setState({ multiValue })
    }

    render() {
        const { isMulti, multiValue, options } = this.state
        // console.log('--- SelectTags.render', this.state)

        return <CreatableSelect
            isMulti={isMulti}
            options={options}
            onChange={this.handleOnChange}
            value={multiValue}
            getOptionLabel={getTagLabel}
            components={{ MultiValueLabel: TagMultiValueLabel }}
            formatCreateLabel={(inputValue) => inputValue}
            placeholder="Введите новые теги добавляя их нажатием Enter"
            classNamePrefix="react-select"
        />
    }

}

// function mapStateToProps(state) {
//     const { tags } = state
//     return {

//     }
// }

// const connectedSelectTags = connect(null)(SelectTags)
// export { connectedSelectTags as SelectTags }
export { SelectTags }

