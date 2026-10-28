# The 100,000-keyword requirement

**Not completed.** Do not describe the 216 measured Keyword Planner rows, generated phrase combinations or candidate CSVs as a completed 100,000-keyword test.

The supplied skill attributes a 100,000-keyword test to the video's example business and asks for comparably broad research for another business. The work here has completed two discovery samples: 127 UK/English rows and 89 France/French rows, all captured and reviewed. The owner has approved the resulting first batch of fifteen targets and six French pages.

Google's supported historical-metrics API accepts up to 10,000 keywords per request and can merge close variants. A genuine 100,000-input pass therefore needs a real, relevant candidate dataset and at least ten requests, with each submitted batch, market, language, response, missing result and close-variant merge recorded. For two market/language cohorts the candidate accounting must avoid treating repeated inputs as extra unique phrases.

Source: https://developers.google.com/google-ads/api/docs/keyword-planning/generate-historical-metrics

No Google Ads API connection/developer authorization is configured in the available tools. Browser Keyword Planner is available, but the report export stalled. The 216-row dataset was therefore captured from the live rendered tables rather than claimed as a downloaded export. No campaign was activated or advertising budget spent to obtain more detailed numbers.

## Completing the larger pass

1. Obtain a sufficiently broad candidate dataset from actual Search Console queries, Keyword Planner expansion and an existing authorized keyword source. Keep the original terms and provenance. Do not pad to 100,000 with irrelevant or untested phrases and call them real searches.
2. Establish an approved Google Ads API connection, or use Keyword Planner's supported bulk historical-metrics import with the account's actual limits. Never extract private browser session tokens or call undocumented account endpoints.
3. Deduplicate and validate inputs against the real offer and search markets. Submit supported batches, retain source responses and label estimates/close variants correctly. A missing result is not an invented zero.
4. Filter relevant demand, cluster by intent and reconcile it with the approved map. New targets outside the approved batch need the keyword approval required by the supplied skill before page writing.

This requirement remains an explicit gap; the website and measurement improvements do not erase it.
