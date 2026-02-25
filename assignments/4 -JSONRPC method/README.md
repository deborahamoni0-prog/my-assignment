* The JSON -RPC interface is an interface that allows us to write programs that use an etherum clients as a gateway to an etherum network & blockchain 
* it is restricted by default to accept cnnections only from localhost (the ip address of your own computer , which is 127.0.0.0).
* To access the JSON-RPC API, you can use a specialized library (written in the programming language of your choice) that provides “stub” function calls corresponding to each available RPC command, or you can manually construct HTTP requests and send/receive JSON-encoded requests. You can even use a generic command-line HTTP client like curl to call the RPC interface. 
* The JSON-RPC request is formatted according to the JSON-RPC 2.0 specification. Each request contains four elements:

jsonrpc

Version of the JSON-RPC protocol. This must be exactly "2.0".

method

The name of the method to be invoked.

params

A structured value that holds the parameter values to be used during the invocation of the method. This member may be omitted.

id

An identifier established by the client that must contain a string, number, or NULL value if included. The server must reply with the same value in the response object if included. This member is used to correlate the context between the two objects.

