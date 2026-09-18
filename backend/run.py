"""Local dev entrypoint for Windows.

`uvicorn app.main:app` imports the app module lazily, inside its own
`asyncio.run()` — by then the event loop already exists under the default
Windows ProactorEventLoopPolicy, too late for psycopg's async mode (which
requires the selector loop). Setting the policy has to happen here, before
uvicorn creates its loop at all.

In production (Linux, via ecosystem.config.js/pm2 or similar) this doesn't
apply — run with `uvicorn app.main:app` directly there.
"""

import asyncio
import sys

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

import uvicorn

if __name__ == "__main__":
    # reload=False: uvicorn's --reload spawns a subprocess and sets its own
    # event loop policy for that path, which fights this file's fix.
    uvicorn.run("app.main:app", host="127.0.0.1", port=8001, reload=False)
