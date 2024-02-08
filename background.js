
const requestHandler = async (req)=>{
  if(req.type==='toApi'){
    const id = await chrome.identity.getProfileUserInfo()
    const openAI = await chrome.storage.local.get('gpt_api')
    const knosticAPI = await chrome.storage.local.get('knostic_api')
    const body = {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": req.prompt}]
  };
  if(openAI.gpt_api && knosticAPI.knostic_api){
    const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'x-knostic-api-key': knosticAPI.knostic_api,
          'x-knostic-user-id':id.email,
          'Authorization': `Bearer ${openAI.gpt_api}`
      },
      body: JSON.stringify(body)
  };
  
  const response = await fetch("https://api-gw-prod-demo.knostic.cloud/api/v1.0/openai/v1/chat/completions", requestOptions)
  
  
  const jsonData = await response.json();
  const data = jsonData.choices[0].message;
  return data;
  }
  else{
    return "Please set your API Keys in popup of the extension!!!"
  }
  
}}

chrome.runtime.onMessage.addListener((req,sender, sendResponse)=>{
  requestHandler(req).then(res=>{console.log("res",res);sendResponse(res)})
  return true;
})
