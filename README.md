# Bugsnag2Split

 [More Documentation Here](https://davidbrookemartin.com/2022/07/19/bugsnag-and-split-events-integration/) 

More documentation to follow...

 * Create a SPLIT_API_TOKEN file and create a server-side API token (for use sending events with REST API).  Do not use an Admin API token.
 * Zip and upload this code to a new AWS node.js lambda
 * Create a function URL for POST to the lambda
 * Create a webhook in Bugsnag, providing the function URL and specifying that the webhook be invoked "Every time an error occurs"
 * Test the webhook to see events in Split

david.martin@split.io

