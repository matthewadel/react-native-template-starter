export default function ConvertStyleToObject(style: any): any {
    let outputStyle = null
    if (!Array.isArray(style)) {
        outputStyle = { ...style }
    }

    else {
        let temp = [...style]
        outputStyle = temp.reduce(function (result, current) {
            return Object.assign(result, current);
        }, {})
    }

    return outputStyle
}
