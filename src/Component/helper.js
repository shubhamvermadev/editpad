export const formatJson = (str, space) =>{
    return JSON.stringify(JSON.parse(str), null, space)
}