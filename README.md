# Cross-domain cookie POC

## Local testing

Run not working cross domain cookie
```
npm run cross-not-working
```

Run working cross domain cookie
```
npm run cross-working
```

Set `etc/hosts`
```
127.0.0.1 1st.com
127.0.0.1 2nd.com
127.0.0.1 3rd.com
127.0.0.1 cookie-cors.1st.com
127.0.0.1 cookie-cors.2nd.com
127.0.0.1 cookie-cors.3rd.com

```