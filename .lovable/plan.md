# Email not arriving at the EY address — diagnosis and next steps

## What the checks show

- The send was accepted and dispatched at 23:05 UTC to raja.bhattacharjee@in.ey.com from notify.rogerarcher.com.
- No bounce, no rejection, no rate limiting recorded for it.
- The address is not suppressed, in any scope.
- The sender domain is fully verified with correct authentication records.

So the site, the form, the endpoint and the sending domain are all working. The message left Lovable and was accepted onward. It is being held or dropped inside EY's mail gateway, which does not report back — a brand-new sending domain with no reputation history is the usual reason corporate filters quarantine silently.

## Recommended next steps

1. Confirm delivery to a non-corporate address (Gmail/Outlook.com). If it arrives there, the pipeline is proven and the issue is purely EY-side filtering.
2. Ask EY IT to release the message from quarantine and allowlist notify.rogerarcher.com. Give them the timestamp 2026-08-21 23:05 UTC and the sender address.
3. Warm the domain gradually — a handful of sends per day for the first week — rather than sending to a large audience immediately.

## Optional improvements I can make

- Add a bounce/complaint receiver so future non-delivery signals are captured automatically instead of being invisible.
- Change the visible sender address from noreply@ to reading@rogerarcher.com, which corporate filters treat more favourably than noreply.
- Adjust the resources page confirmation copy to mention that corporate mail filters can delay the message.

## Out of scope

- Any change to the presentation, reading list content, or GitHub hosting.
- Switching to a third-party email provider.
