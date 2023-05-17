# Cross-domain cookie POC

1. Render page with form and submit button.
    - If the request has a cookies:
        - Diplay the value in the page.
    - Else:
        - Only render page and the button.
1. User fill the form and click the submit button.
1. Web send request through `fetch` (xhr) to the server.
1. Server write the payload to the page.
1. Server write the cookies to the response.
