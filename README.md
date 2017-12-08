# LeetEnhance

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/)    

> A simple extension enhances the LeetCode editor function

* Currently only supports the `Vim` layout . If you are interested, 
    just add the` Emacs` layout.

> I'm sorry for my English expression. If you have any questions, please 
> contact me or create an issue.


```bash
npm install
gulp bundle
```

## DEMAND

  At the beginning of coding in `LeetCode`, I has been using the local `Vim` 
editor. Using the online editor is so frustrating. I also search from extensions
`Web Store`, and can not find a extension for `Vim` keyboard layout.

## Project Source

  Until recently I learned that the site was using `Ace` editor, which is a simple
online code editor. And when I search  `ace editor vim` with google, I found a 
good extension [pocketvim][pocketvim] from  [enable-vim-mode-in-gist-ace-editor][question-stack]

* This extension  has only been tested on the `LeetCode` site and is not guaranteed to work properly in other pages that use` Ace` as an online editor.

## SCOPE

  1. The extension is for `LeetCode` users;
  2. Use `Vim` has reached the level of proficiency, and directly use the
     `LeetCode` editor to code;

## EXIST

  1. Simple `Vim` keyboard layout, support search with `?`;
  2. In the Ex mode, enter `r` to run the code and enter` s` to commit;
  3. Support theme, font face, font size modify(Need to refresh the page)

## TODO

  1. `Emacs` keyboard layout(Maybe not, For `Emacs` users, I can only say sorry);
  2. When we make modify options, page refreshing no needed.
  3. ...

## Long time support until leetcode add vim mode or I went to Google.


## LICENSE

This project is licensed under version 3 of the GNU General Public License.

[pocketvim]: https://github.com/NickTomlin/pocketvim
[question-stack]: https://stackoverflow.com/questions/15485153/enable-vim-mode-in-gist-ace-editor/20231327