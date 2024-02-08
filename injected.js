(()=>{
    
    const getAPIResponse = (prompt) => {
        return new Promise((resolve, reject) => {
          const listener = (msg) => {
            if (msg.data.type === 'response') {
              console.log("Inj", msg);
              window.removeEventListener('message', listener);
              resolve(msg.data.response);
            }
          };
      
          window.addEventListener('message', listener);
      
          window.postMessage({ type: 'prompt', prompt: prompt });
        });
      };
      
    window.addEventListener('load',()=>{
        console.log("Injected!!!!");
        async function modifyResponse(response,prompt) {
            try {
                const apiResponse = await getAPIResponse(prompt)
                console.log(apiResponse)
                const sendLLM = apiResponse.content || apiResponse;
                console.log("LLM",sendLLM)
               const resArr = response.split('data: ')
                let n='';
               for(let i=0;i<resArr.length;i++){
                let s = resArr[i].trim()
                if(s.includes("in_progress")){
                let js2 = JSON.parse(s);
                js2.message.content.parts = [""]
                let modifiedJsonString2 = JSON.stringify(js2);
                n=n+"data: "+modifiedJsonString2+"\n\n";
                }
                
                else if(s.includes("finished_successfully")){
                    let js = JSON.parse(s);
                js.message.content.parts = [sendLLM]
                let modifiedJsonString = JSON.stringify(js);
                n=n+"data: "+modifiedJsonString+"\n\n";
                }
                else
                n=n+"data: "+s+"\n\n";
               }
                
                return n;
                /////////////// END //////////////////
            } catch (e) {
                console.log(e)
                return response;
            }
        }
        
        function interceptAndModifyRequest() {
            const fetch = window.fetch;
    
            window.fetch = function (input, init) {
                if(typeof(input)===typeof('str') && input==="https://chat.openai.com/backend-api/conversation"){
                   
                return fetch.apply(this, arguments).then(function (response) {
                    if (response.url.includes('.com')) {
                        const arg= JSON.parse(init.body).messages[0].content.parts[0]
                        return response.text().then(async function (text) {
                            var modifiedText = await modifyResponse(text,arg);
                            console.log("Status:",response.status)
                            console.log("Status Text:",response.statusText)
                            return new Response(modifiedText, {
                                status: response.status,
                                statusText: response.statusText,
                                headers: response.headers,
                            });
                        });
                    }
                    return response;
                });
            }
            else{
                return fetch.apply(this,arguments)
            }
            };
        
        }
        interceptAndModifyRequest();
    })
})()

