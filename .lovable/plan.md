# Change the visible sender address to Raja@rogerarcher.com

## What changes

Emails currently show as "Meta Trends <noreply@notify.rogerarcher.com>". They will show as "Raja Bhattacharjee <Raja@rogerarcher.com>" instead. A friendly named sender at the main domain also tends to fare better with corporate mail filters than a noreply address.

Replies go to that address, so anyone replying to the reading-list email reaches you directly.

## How it works

- The underlying sending and authentication stay on the verified sender subdomain — nothing about DNS or verification changes.
- Only the address shown in the inbox changes.

## Technical detail

- In the email send helper, set the visible From local part to `Raja` and the visible From domain to the root domain, keeping the verified sender domain unchanged for authentication.
- If the platform is not yet allowing root-domain display for this project, the From falls back to the verified subdomain (`Raja@notify.rogerarcher.com`) and I will report that rather than leave sending broken.

## Verification

Send one test to the EY address and one to a non-corporate address, then confirm the delivery events and the From line as it appears in the inbox.

## Out of scope

- Any change to the email content, the resources page, or hosting.
