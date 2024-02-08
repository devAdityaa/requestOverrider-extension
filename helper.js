(async ()=>{
window.addEventListener("message",(message)=>{

    if(message.data.type==='prompt'){  
        const prompt = message.data.prompt;
        console.log("hlp, prompt",prompt)
        chrome.runtime.sendMessage({type:"toApi",prompt:prompt}).then(res=>window.postMessage({type:'response',response:res}))
    }
})
 //

})()