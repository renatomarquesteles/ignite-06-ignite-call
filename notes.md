# Page Extension
It was added a configuration at `next.config.js` to specify which files will
create a new page in the app.
Doing this we can create any files we want in the `src` folder without accidentally
creating a new page.
So when we actually want to create a new page we must add the .page.tsx extension.

# Images
By default next/image reduce the quality of the images to 80%
It also puts the image loading priority to the lowest
It's possible to change that using the `quality` and `priority` parameters when
necessary (In the home page as an example).
