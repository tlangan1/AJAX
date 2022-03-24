# Fetch and XHR APIs

Fetch and XMLHttpRequest (otherwise known as XHR) are JavaScipt APIs provided by browsers to automate server requests.  This is known as AJAX.  You would not find these capabilities in servers such as Node.js as that would make no sense.  Fetch is the newer and more robust option.

readyState  Holds the status of the XMLHttpRequest. Changes from 0 to 4:  
0: request not initialized  
1: server connection established  
2: request received  
3: processing request   
4: request finished and response is ready