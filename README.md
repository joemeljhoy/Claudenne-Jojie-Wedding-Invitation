# Claudine & Jojie Wedding Invitation

A mobile-first wedding invitation with an animated envelope, ribbon, wax seal, scrolling details, countdown, entourage, dress code, and RSVP button.

## Edit the wedding information
Open `script.js` and edit only the `wedding` object at the top:
- Date and time
- Venue and map links
- Ceremony and reception information
- RSVP deadline and Google Form link
- Entourage names

## Add photos
Replace the `.photo-placeholder` block in `index.html` with:

```html
<img src="assets/prenup.jpg" alt="Claudine and Jojie" style="width:100%;display:block;">
```

Then add `prenup.jpg` inside the `assets` folder.

## Add background music
Add an MP3 file named `music.mp3` inside the `assets` folder. Browsers require the visitor to tap the music button before audio can play.

## Publish free using GitHub Pages
1. Sign in to GitHub and create a new public repository, for example `claudine-jojie-wedding`.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder to the repository root.
3. Open repository **Settings** > **Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then click **Save**.
6. Wait a few minutes. GitHub will show the public website address.

## Preview on your computer
Double-click `index.html`. Internet access is needed for the Google Fonts. For the best test, use Visual Studio Code with the Live Server extension.
