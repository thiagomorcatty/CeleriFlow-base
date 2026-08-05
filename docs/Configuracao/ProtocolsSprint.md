# Protocols Sprint Operations

## Deadline reminders

The internal deadline reminder foundation is available at `GET /api/protocolos/deadline-notifications`.
It creates one deduplicated reminder per active user in the current process department for deadlines in the next three days.

Vercel Cron calls the route daily at 10:00 UTC. Configure `CRON_SECRET` in
Vercel Production; Vercel sends it automatically as:

```text
Authorization: Bearer <PROTOCOLS_CRON_SECRET>
```

`PROTOCOLS_CRON_SECRET` remains supported for an external scheduler. Receive,
forward, and deadline-assignment notifications work without the cron.

## Firebase document signatures

Internal signatures now require Firebase email/password reauthentication. The deployed application must retain the existing public Firebase web configuration and Firebase Admin credentials; no additional provider is required.
