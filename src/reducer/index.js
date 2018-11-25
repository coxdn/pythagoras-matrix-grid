const initialState = { hideElement: false }

export default (state = initialState, action) => {
	const { type } = action

	switch (type) {
		case "HIDE_ELEMENT":
			return { hideElement: true }
		case "SHOW_ELEMENT":
			return { hideElement: false }
	}
	return state
}