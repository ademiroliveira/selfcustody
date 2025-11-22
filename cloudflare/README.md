# Cloudflare Worker deployment

This worker proxies POST traffic to the FastAPI `/run` endpoint with the shared bearer token.

## Setup

1. Configure environment variables in Cloudflare:
   - `SERVICE_ENDPOINT`: Public URL to your FastAPI deployment (without the `/run` suffix).
   - `SERVICE_TOKEN`: Shared bearer token that must match the FastAPI `SERVICE_TOKEN` environment variable.
2. Deploy with Wrangler:

```bash
cd cloudflare
wrangler deploy
```

## Usage

Send a POST request to the worker route with your desired payload. The worker forwards the request to `<SERVICE_ENDPOINT>/run` and returns the API response transparently.
