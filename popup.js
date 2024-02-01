const btn = document.getElementById('search')
btn.addEventListener('click', function(){
    const input = document.getElementById('searchterm')
    const inputValue = input.value
    console.log("POPUP",inputValue)
    const data = {'base_url':inputValue}
    chrome.storage.local.set(data)  
    window.close()
})