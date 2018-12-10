export const getNearestFreeXY = (layout, cols) => {
    if(!layout.length) return {x: 0, y: 0}
    const maxY = Array.from(layout).sort((a, b) => a.y > b.y ? -1 : 1)[0].y
    for(let i in Array.from({length: (maxY+2)*cols})) {
    	i = parseInt(i)
        const x = (i+1)%cols
        const y = (i+1)/cols>>0
        if(!layout.filter(item => item.x==x && item.y==y).length)
            {
            	return {x, y}}
    }
}