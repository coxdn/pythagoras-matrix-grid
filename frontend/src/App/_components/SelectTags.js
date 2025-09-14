import React from 'react'
import CreatableSelect from 'react-select/creatable'

import '../../../css/select-plus.css'

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

