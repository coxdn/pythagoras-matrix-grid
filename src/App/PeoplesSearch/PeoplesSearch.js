import React from 'react'
import SelectSearch from 'react-select-search'

import '../../../css/select-search.css'

class PeoplesSearch extends React.Component {
    render() {
		return <SelectSearch
                    name="peoples"
                    multiple={true}
                    height={280}
                    options={this.props.peoples}
                    placeholder="Поиск..."
                    renderOption={renderPeopleItem}
                    onChange={this.props.handleSelected}
                    onInputChange={this.props.onInputChange} // added function in module for the interception
                    onInputKeyPress={this.props.onInputKeyPress} // added function in module for the interception
                    autofocus={true}
                    fuse={{
                        shouldSort: true,

                        // When "true", the algorithm will search individual words and the full string, computing the final score as a function of both. In this case, the "threshold", "distance", and "location" are inconsequential for individual tokens, and are thus ignored.
                        tokenize: true,

                        // includeScore: true,
                        // At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything.
                        threshold: 0,
                        location: 0,
                        distance: 1000,
                        maxPatternLength: 32,
                        minMatchCharLength: 1,

                        // properties of the people item object used for the search
                        keys: [ "name", "date", "age", "tagSearch"
                            /*{name:"name", weight:1},
                            {name:"date", weight:1},
                            {name:"age", weight:1},
                            {name:"tagSearch", weight:1},*/
                            ]
                    }}
                />
    }
}

function renderPeopleItem(option) {
    // this condition is necessary if includeScore is true ( <SelectSearch ... fuse={{..., includeScore: true, ...}} )
    const item = option.item ? option.item : option

    // if photo not empty. But now this function is not implemented
    const photo = item.photo ? <img className="avatar" src={item.photo} /> : null
    const tag = item.tags ? item.tags.map((tag, i) => <span key={i}>{tag.value}</span>) : ''
    return (<span>{photo}<span>{item.name}</span><span>{item.date}{item.age ? " ("+item.age+")" : ''}</span><span>{tag}</span></span>)
}


export { PeoplesSearch }