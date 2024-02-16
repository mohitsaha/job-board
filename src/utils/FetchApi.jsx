async function fetchApi(link){
    try{
        let response = await fetch(link);
        let ans = await response.json();
        return ans;
    }catch(err){
        throw new Error(err);
    }
}
export default fetchApi;

