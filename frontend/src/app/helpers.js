export const unslugify = (slug) => {
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export const slugify = (text) => {
    return text.trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-");
}

export const calculateCAGR = (data) => {
    if (!data || data.length < 2) return null

    const sorted = [...data].sort((a, b) => a.year - b.year)
    const startYear = sorted[0].year
    const endYear = sorted[sorted.length - 1].year
    const startValue = sorted[0].value
    const endValue = sorted[sorted.length - 1].value
    const years = endYear - startYear

    if (startValue <= 0 || years <= 0) return null

    const cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100
    return cagr
}
