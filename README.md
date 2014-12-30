```
                                        CLI GitHub
                          A fancy GitHub client for command line.

                                    ..    ..::..    ..
                                  ..  ,,LLCCCCCCLL,,  ..
                                    ,,CCCCCCCCCCCCCC,,
                                    LLCC,,iiiiii,,CCLL
                                  ,,CCCC          CCCC,,
                                  ::CCLL  ......  ffCC::
                                  ,,CCCC    ..    CCCC,,
                                    CCCCLLii  ;;LLCCCC
                                    ;;CCffii  ttCCCC;;
                                  ..  ;;CC11  11CC;;  ..
                                    ..  ....  ....  ..







             :1ffftti,                .:::.    ,:::              :::,
           tCCCCCCCCCL  fCCf   .... . 1CCC1    LCCC,            ,CCCL .
          LCCCCLtttfL; .CCCC. ,CCCf . 1CCCt .. CCCC,            ,CCCL
         1CCCC.         ;ff;  ;CCCL,; 1CCC1    LCCC..;:;.  .;:;.,CCCL,i11;
         LCCC;  ;iiiii, CCCC.CCCCCCCC:iCCCCLLLLCCCC tCCCi  tCCCi.CCCCCCCCCC;
         LCCC:  CCCCCCf CCCC fLCCCCff.1CCCCCCCCCCCC tCCCi  tCCCi.CCCC1itCCCC
         LCCC;  tfLCCCt CCCC  ,CCCL . 1CCCf:;;:CCCC tCCCi  tCCCi.CCCL . LCCC:
         iCCCC.   iCCCt CCCC  :CCCL . 1CCC1    LCCC tCCCi  1CCCi.CCCL . LCCC:
          LCCCCLffLCCCf CCCC  .CCCCi1 1CCC1 .  CCCC tCCCLi1LCCCi.CCCC1itCCCC
           1CCCCCCCCCC1 CCCC   tCCCCC;iCCC1    LCCC..CCCCCCCCCCi.CCCCCCCCCC:
             .;1tt1i:   :;;:    ,i11i..;;;.    :;;;   :1t1i,.;;. ;;:.;111;

```

## Prerequisites

 - [NodeJS](http://nodejs.org/)
 - [GraphicsMagick](http://www.graphicsmagick.org/)

   ```sh
   # Ubuntu
   $ sudo apt-get install graphicsmagick
   # Mac OS X
   $ brew install graphicsmagick
   ```

## Installation

```sh
$ npm install -g cli-github
```

## Usage

```sh
$ github
```

Use the following key shortcuts to access different GitHub resources:

### News Feed
 - <kbd>SHIFT</kbd> + <kbd>C</kbd>: Create a new repository on GitHub.
 - <kbd>SHIFT</kbd> + <kbd>P</kbd>: Visit GitHub profiles (default: your GitHub profile).
 - <kbd>SHIFT</kbd> + <kbd>I</kbd>: View the open issues that are assigned to you.
 - <kbd>SHIFT</kbd> + <kbd>R</kbd>: View the open pull requests that created by you.
 - <kbd>SHIFT</kbd> + <kbd>←</kbd>: Go back in history
 - <kbd>SHIFT</kbd> + <kbd>→</kbd>: Go forth in history

### Profile
 - <kbd>SHIFT</kbd> + <kbd>R</kbd>: Fetch user's followers.
 - <kbd>SHIFT</kbd> + <kbd>N</kbd>: Fetch user's following.
 - <kbd>SHIFT</kbd> + <kbd>M</kbd>: Fetch the organization members.

### User List
 - <kbd>SHIFT</kbd> + <kbd>P</kbd>: Visit GitHub profiles (default: your GitHub profile).


## Screenshots

### Splashscreen

![](/screenshots/splashscreen.png)

### News Feed

![](/screenshots/news-feed.png)

### Create repository
![](/screenshots/create-repo.png)

### Profile
![](/screenshots/profile.png)

### Issues
![](/screenshots/issues.png)

### Pull Requests
![](/screenshots/pull-requests.png)

## Changelog
See the [releases page](https://github.com/IonicaBizau/cli-github/releases).

## How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
