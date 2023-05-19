# Cross-domain cookie POC

## Local testing

### Add this to `/etc/hosts` file:
```
127.0.0.1 1st.com
127.0.0.1 2nd.com
127.0.0.1 3rd.com
127.0.0.1 cookie-cors.1st.com
127.0.0.1 cookie-cors.2nd.com
127.0.0.1 cookie-cors.3rd.com
```

### Run **NOT WORKING** cross domain cookie
```
npm run cross-not-working
```

### Run **WORKING** cross domain cookie
```
npm run cross-working
```
