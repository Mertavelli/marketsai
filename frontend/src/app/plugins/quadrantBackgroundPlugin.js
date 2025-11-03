const quadrantBackgrounds = {
    id: 'quadrantBackgrounds',
    beforeDraw: (chart) => {
        const { ctx, chartArea, scales } = chart
        const midX = scales.x.getPixelForValue(5)
        const midY = scales.y.getPixelForValue(5)

        ctx.save()
        const quadrants = [
            { x0: chartArea.left, x1: midX, y0: chartArea.top, y1: midY, color: 'rgba(191, 219, 254, 0.5)' }, // oben links
            { x0: midX, x1: chartArea.right, y0: chartArea.top, y1: midY, color: 'rgba(147, 197, 253, 0.5)' }, // oben rechts
            { x0: chartArea.left, x1: midX, y0: midY, y1: chartArea.bottom, color: 'rgba(219, 234, 254, 0.5)' }, // unten links
            { x0: midX, x1: chartArea.right, y0: midY, y1: chartArea.bottom, color: 'rgba(96, 165, 250, 0.5)' }, // unten rechts
        ]
        for (const quad of quadrants) {
            ctx.fillStyle = quad.color
            ctx.fillRect(quad.x0, quad.y0, quad.x1 - quad.x0, quad.y1 - quad.y0)
        }
        ctx.restore()
    },
    afterDraw: (chart) => {
        const { ctx, chartArea, scales } = chart
        const midX = scales.x.getPixelForValue(5)
        const midY = scales.y.getPixelForValue(5)

        ctx.save()
        ctx.strokeStyle = '#000'
        ctx.setLineDash([5, 3])
        ctx.beginPath()
        ctx.moveTo(midX, chartArea.top)
        ctx.lineTo(midX, chartArea.bottom)
        ctx.moveTo(chartArea.left, midY)
        ctx.lineTo(chartArea.right, midY)
        ctx.stroke()
        ctx.restore()

        ctx.save()
        ctx.fillStyle = '#333'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.fillText('Niche', chartArea.left + 4, chartArea.top + 4)

        ctx.textAlign = 'right'
        ctx.fillText('Attractive', chartArea.right - 4, chartArea.top + 4)

        ctx.textAlign = 'left'
        ctx.textBaseline = 'bottom'
        ctx.fillText('Not attractive', chartArea.left + 4, chartArea.bottom - 4)

        ctx.textAlign = 'right'
        ctx.fillText('Question marks', chartArea.right - 4, chartArea.bottom - 4)
        ctx.restore()
    }
}

export default quadrantBackgrounds
