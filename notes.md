# Page Extension
It was added a configuration at `next.config.js` to specify which files will
create a new page or api route in the app.
Doing this we can create any files we want in the `src` folder without accidentally
creating a new page or api route.
So when we actually want to create a new page we must add the .page.tsx extension.
And to create an api route we must add the .api.ts or .api.tsx extension.

# Images
By default next/image reduce the quality of the images to 80%
It also puts the image loading priority to the lowest
It's possible to change that using the `quality` and `priority` parameters when
necessary (In the home page as an example).

# API Routes
A way to have backend routes inside the frontend of the app.
Files inside the `/pages/api` folder with the `.api.tsx?` extension (as configured
on `next.config.js`) are mapped to `/api/*` and will be treated
as an API endpoint.

# OAuth
It allows users to grant third-party applications access to their resources without
sharing their credentials. It enables users to log in using their existing social
media or other online accounts, granting limited access to their data.

# Next-Auth
Full-featured authentication system with built-in providers (Google, Facebook, GitHub...),
JWT, JWE, email/password, magic links and more...

# Google OAuth
https://console.cloud.google.com/apis/dashboard
> OAuth permissions configuration
> Google Calendar API activation
