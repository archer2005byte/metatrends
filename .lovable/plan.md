# Verify the QR-to-email path end to end

## What I checked (read-only)

- The QR code on the final slide is generated at runtime from the current site address plus `/resources`, so scanning it on the GitHub-hosted site opens the GitHub resources page.
- The email endpoint on your published Lovable app is live and responding: a request with a bad address is correctly refused with "invalid email", which proves the route is deployed and reachable from outside.
- The resources page posts to that published endpoint whenever it is not running on Lovable or localhost, which is the GitHub case.

So the wiring is correct. What I have not proven is a real delivery from the GitHub page, because that requires actually sending an email.

## Proposed verification

1. Load the live GitHub site in a headless browser, open the resources page the QR points to, type your address, and submit.
2. Capture the on-screen confirmation and the network response from the Lovable endpoint.
3. Check Lovable's email delivery log for a matching "sent" event.
4. Report the outcome; if it fails, fix the specific cause (endpoint access, sender domain, or suppression).

## Note

This test sends one real email to the address used. Tell me which address to use (roger@rogerarcher.com by default).

## Out of scope

- Changes to the presentation or reading list content.
- Any change to hosting or the deployment workflow.
