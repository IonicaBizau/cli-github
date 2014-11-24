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
 - [ImageMagic](http://www.imagemagick.org/)

   ```sh
   # Ubuntu
   $ sudo apt-get install imagemagick
   # Mac OS X
   $ brew install imagemagick
   ```

## Installation

```sh
$ npm install -g cli-github@1.0.0-beta3
```

## Usage

```sh
$ github
```

Use the following key shortcuts to access different GitHub resources:

 - <kbd>SHIFT</kbd> + <kbd>C</kbd>: Create a new repository on GitHub.
 - <kbd>SHIFT</kbd> + <kbd>P</kbd>: Visit GitHub profiles (default: your GitHub profile).
 - <kbd>SHIFT</kbd> + <kbd>I</kbd>: View the open issues that are assigned to you.
 - <kbd>SHIFT</kbd> + <kbd>R</kbd>: View the open pull requests that created by you.
 - <kbd>SHIFT</kbd> + <kbd>←</kbd>: Go back in history
 - <kbd>SHIFT</kbd> + <kbd>→</kbd>: Go forth in history

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
