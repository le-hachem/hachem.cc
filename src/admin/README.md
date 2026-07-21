# The Desk — admin console

An editor for the site's content at `/admin`, lazily loaded so the public page
never downloads it.

It runs in one of two modes, decided by a single environment variable.

| | `VITE_ADMIN_API` unset | `VITE_ADMIN_API=https://api.hachem.cc` |
|---|---|---|
| Where edits go | `localStorage`, in that browser | your server |
| How the site updates | paste the export into the repo, commit | immediately |
| Sign-in | passphrase (see below) | password → bearer token |
| File uploads | disabled | `POST /api/uploads` |

Nothing above `store.ts` knows which mode is in use, so moving off GitHub Pages
is a matter of setting the variable and implementing the endpoints below.

## What it edits

| Collection | Source file | Feeds |
|---|---|---|
| Concerts | `src/app/i18n/concerts.ts` | the Agenda section |
| Dispatches | `src/app/i18n/dispatches.ts` | the news column |
| Works | `src/app/i18n/compositions.ts` | the featured rack, the library, `/piece-id` |
| Lili Boulanger | `src/app/i18n/lili.ts` | the restoration project's library |

Each collection is described once in `collections.ts` — its fields, their types,
how a record is summarised, how it is written back out. The list view, the form,
validation and the export are all generated from that description, so adding a
field means adding one entry to a `fields` array, not touching four files.

The console reads today's content straight from those modules (`concertSource`,
`dispatchSource`, `compositionSource`, `liliSource`) the first time it runs, so
it always starts from what is actually on the site.

## Publishing, while the site is static

The **Publish** screen renders each collection back as the TypeScript that
belongs in its source file. Copy it over the `const source` array, commit, and
the existing deploy workflow ships it. Unpublished records are left out, so a
date can be drafted before it's announced.

Formatting matches what's already in those files — two-space indent, localized
maps inline when short and stacked when long — so the diff shows what actually
changed rather than a reformat of the whole file.

## The HTTP contract

Every response is JSON. `:collection` is one of `concerts`, `dispatches`,
`compositions`, `lili`. All content routes require `Authorization: Bearer <token>`.

```
POST   /api/auth/login      {password}      → {token}
GET    /api/auth/me                         → {ok: true}      (401 when stale)

GET    /api/:collection                     → Record[]
PUT    /api/:collection/:id   Record        → Record[]        (upsert; :id is the
                                                               id *before* an edit,
                                                               so renames work)
DELETE /api/:collection/:id                 → Record[]
POST   /api/:collection/reorder  {ids}      → Record[]

GET    /api/settings                        → {VITE_*: boolean}
PUT    /api/settings   {VITE_*: boolean}    → 204

POST   /api/uploads     multipart `file`    → {url}
```

The mutating routes return the whole collection in its new order rather than
the single changed record — it keeps the client from having to guess where an
edit landed, and the collections are small enough that it costs nothing.

A record is a flat object: `id`, `published`, then one key per field. Translated
fields hold `{en, fr, de}` (or `{en: [], fr: [], de: []}` for lists). The
**Publish → JSON** tab is exactly the shape `GET /api/:collection` should
return, so it doubles as seed data.

## Things worth knowing

- **Routing is on the hash** (`#/works/myrrha`). No server rewrite rule needed,
  now or later.
- **A work's `id` is its public URL** (`hachem.cc/myrrha`), and it's also in
  `SEO_PIECES` in `vite.config.ts` — renaming one means updating that list and
  the sitemap, or the per-piece page stops being generated.
- **Validation blocks saving only for things that would break the build**: a
  malformed date, a duplicate id, a missing required field. Missing translations
  are shown as warnings, because writing the English first is normal.
- **Drafts are per-browser** in local mode. They aren't backed up. Export
  anything worth keeping before clearing site data.

## Getting in

**With a backend**, the server is the authority: `POST /api/auth/login` returns a
token that every other call carries, and a stale token drops you back to the
login screen. That is a real boundary.

**Without one**, there is no server to ask, so the console checks a passphrase
in the browser instead. Open `/admin`, pick a passphrase, and paste the block it
prints over the `passphrase` value in `auth.config.ts`. Only a salt and a
PBKDF2-SHA-256 hash get committed — the passphrase itself is never written down
or sent anywhere, so the block is safe in a public repo. Unlocking lasts for the
tab.

Be clear-eyed about what that buys you. The check runs in JavaScript the visitor
has already downloaded, so someone who opens devtools can step past it; 600,000
PBKDF2 rounds make *guessing* the passphrase expensive, but they don't stop
someone editing the code that does the comparing. It keeps the console out of
reach of anyone who wanders to `/admin`, and that is all it is for.

What makes that acceptable today is that there is nothing behind the gate worth
taking: the console edits drafts in the visitor's own browser, and the live site
changes only when someone with push access commits. The moment content is served
from a database, `VITE_ADMIN_API` puts the server in charge and the passphrase
stops being what stands between a stranger and the content.
