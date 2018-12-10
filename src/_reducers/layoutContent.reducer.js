import { layoutConstants } from '../_constants';

const initialLayoutContent = {}

export const layoutContent = (layoutContent = initialLayoutContent, action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case layoutConstants.ADD_ITEM:
            console.log('--- payload,,', payload)
        	return {
        		...layoutContent,
        		[randomId]: payload
        	}
		case layoutConstants.REMOVE_ITEM:
			const {...tmpContent} = {...layoutContent}
			delete tmpContent[payload.id]
			return {
				...tmpContent
			}
    }

    return layoutContent
}