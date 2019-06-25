export default function filterData(result,values){
    if(!values||Object.keys(values).length===0)return result
    Object.keys(values).forEach(k => {
        if(!values[k]) {
            delete values[k]
        }
    })
    let vals = Object.entries(values)
    if(vals.length===0)return result
    // [[k,v]]
    return  result.filter(item => vals.every(v => item[v[0]] === v[1]))

} 