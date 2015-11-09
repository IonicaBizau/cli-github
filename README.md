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

# `$ cli-github` [![Support this project][donate-now]][paypal-donations]

A fancy GitHub client for command line.

## Installation

You can install the package globally and use it as command line tool:

```sh
$ npm i -g cli-github
```

Then, run `cli-github --help` and see what the CLI tool can do.

```sh
$ github --help
Usage: cli-github
```

## Prerequisites

 - [NodeJS](http://nodejs.org/)
 - [GraphicsMagick](http://www.graphicsmagick.org/)
    ```sh
    # Ubuntu
    $ sudo apt-get install graphicsmagick
    # Fedora
    $ sudo dnf install GraphicsMagick
    # Mac OS X
    $ brew install graphicsmagick
    ```

## Usage
```
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

## Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2014

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md