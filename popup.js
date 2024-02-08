const btn1 = document.getElementById('gpt')
const btn2 = document.getElementById('nostic')

window.addEventListener('load',()=>{
    chrome.storage.local.get('gpt_api').then((data)=>{
        if(data.gpt_api){
            const save = document.getElementById('gpt')
            save.id ='saved'
            save.innerText = "Saved!"
            const pl = document.getElementById('searchterm1')
            pl.placeholder = "Already Saved OpenAI API"
        }
    })
    chrome.storage.local.get('knostic_api').then((data)=>{
        if(data.gpt_api){
            const save = document.getElementById('nostic')
            save.id ='saved'
            save.innerText = "Saved!"
            const pl = document.getElementById('searchterm2')
            pl.placeholder = "Already Saved Knostic API"
        }
    })
})
btn1.addEventListener('click', function(){
    const input = document.getElementById('searchterm1')
    const inputValue = input.value
    const data = {'gpt_api':inputValue}
    chrome.storage.local.set(data).then(()=>{
        const save = document.getElementById('gpt')
        save.id ='saved'
        save.innerText = "Saved!"
    })
})

btn2.addEventListener('click', function(){
    const input = document.getElementById('searchterm2')
    const inputValue = input.value
    const data = {'knostic_api':inputValue}
    chrome.storage.local.set(data).then(()=>{
        const save = document.getElementById('nostic')
        save.id ='saved'
        save.innerText = "Saved!"
    })  
})