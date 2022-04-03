## TOMEME

This is our sixth project of GeeksHubs Academy FSD bootcamp.

The objective is to create a full stack web Application simulating a social network using React library and MongoDB. This project is complemented by the <a href="https://github.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back"> backend's project</a>.

[Structure](#structure)

* [Welcome View](#welcome-view)

* [Login or Register](#login-or-register)

* [Latest Memes](#latest-memes)

* [Posts Interaction](#posts-interaction)

* [Create Post](#create-post)

* [Profile view](#profile-view)

* [Search view](#search-view)

[Technical Specs.](#technical-specs.)



### Welcome View

ToMeme's welcome page shows a dope tomatoe animation when user is not logged yet.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/login.jpg)

### Login Or Register

User can login or register. Each field is validated.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/loginform.jpg)

### Latest Memes
Home view retrieves latest 10 posts created. At the bottom, there is a button that retrieves 10 more.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/home.jpg)

### Create Post

User can create his own posts uploading a picture in jpg o png format. The front uses <a href="https://apidocs.imgur.com/"> Imgur API service</a> to store the file and its URL is sent to the backend.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/postform.jpg)


### Posts Interaction

You can rate each post and the back returns the average rating.

User can only rate once per post.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/homerating.jpg)


User can comment each posts or answer any comment. Comments have also their own rating.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/homecomments.jpg)


### Profile view

User can access to his data through Profile View.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/profile.jpg)

He also can adds a custom avatar image

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/avatarupdated.jpg)

User can view each posts, comments or answers that has done in the app and update or delete them.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/yourcomments.jpg)

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/updatecomment.jpg)

If user clicks in "show post" into a comment or answer, the original post is shown with all its data.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/gotopost.jpg)


### Search View

User can also search by term. This request to an endpoint that searches the term through many fields and retrieve all relationated data.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/search.jpg)

Data is divided in users that contain that term or posts.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr06_SocialMeme_Back/dev/assets/screenshots/searchresults.jpg)



## Technical Specs.
* All CSS animations have been made without using libraries except the accordions and modals.
* Jason Web Token Authentication has been used for limit user endpoints. Also input validation has been used in each form.
* <a href='https://javascript.plainenglish.io/5-ways-to-optimize-your-functional-react-components-cb3cf6c7bd68'>Functional</a> components is the way used for build this React project because of their better performance potential.
* <a href='https://es.redux.js.org/'>Redux</a> has been used for credentials management and binding sibling components data.
* <a href='https://es.redux.js.org/'>Mantine</a> library has been used for several components like modals, accordions and forms. Although custom styles have been applied to them.
* Different libraries for small details like <a href='https://momentjs.com/'>moment</a> (for comments and answers date management) or <a href='https://tabler-icons-react.vercel.app/'>tabler-icons</a> (for update forms and other icons)
* The project is <a href='https://dev.dkd1mdb9vgabn.amplifyapp.com/'>deployed</a> deployed with AWS Amplify.


## New Features Coming Soon

* Following users retrieve first their posts.
At this moment, following another user only adds him to user's database and renders it. In the future, home view will show first the post of the followed users.

* Other user profile view.
When the user clicks on the nickname of another user, a profile view with all their posts will be shown.

## Credits

This project has been made by <a href="https://github.com/suku60">Juan Manuel Stella</a>, <a href="https://github.com/jmonloop">Javier Monleón</a>, and Iván Company.